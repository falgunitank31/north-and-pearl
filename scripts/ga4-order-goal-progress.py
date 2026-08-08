#!/usr/bin/env python3
"""Pull aggregate GA4 funnel progress for North & Pearl order goals.

This reads only aggregate metrics for dashboarding:
- sessions and users
- ecommerce event counts for view_item, add_to_cart, begin_checkout, purchase
- purchase revenue when available

No customer-level data is requested or stored.
"""

import argparse
import json
import os
import sys
from datetime import date, datetime
from pathlib import Path

SEO_SCRIPTS = Path("/Users/yagneshtank/.codex/skills/seo/scripts")
sys.path.insert(0, str(SEO_SCRIPTS))

try:
    from ga4_report import _build_ga4_client, _resolve_property
    from google_auth import load_config
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Filter,
        FilterExpression,
        FilterExpressionList,
        Metric,
        RunReportRequest,
    )
except Exception as exc:  # pragma: no cover - script dependency guard
    print(json.dumps({"error": f"Could not import GA4 dependencies: {exc}"}))
    sys.exit(1)


FUNNEL_EVENTS = ["select_item", "view_item", "add_to_cart", "begin_checkout", "purchase"]


def parse_args():
    parser = argparse.ArgumentParser(description="GA4 order-goal progress")
    parser.add_argument("--property", default="", help="GA4 property, e.g. properties/546565745")
    parser.add_argument("--start", default="", help="Start date YYYY-MM-DD")
    parser.add_argument("--end", default="", help="End date YYYY-MM-DD")
    parser.add_argument("--json", action="store_true", help="Print JSON")
    parser.add_argument("--out", default="", help="Optional output JSON file")
    return parser.parse_args()


def metric_value(row, index, number_type=float):
    try:
        return number_type(row.metric_values[index].value)
    except Exception:
        return number_type()


def run_report(client, request):
    response = client.run_report(request)
    return response.rows, response.property_quota


def main():
    args = parse_args()
    config = load_config()
    prop = args.property or config.get("ga4_property_id") or ""
    if not prop:
        result = {"error": "Missing GA4 property. Set --property or ga4_property_id in Google config."}
        print(json.dumps(result, indent=2))
        sys.exit(1)

    start = args.start or os.environ.get("NORTH_PEARL_GOAL_START") or "2026-08-08"
    end = args.end or date.today().isoformat()

    client = _build_ga4_client()
    if not client:
        result = {"error": "Could not build GA4 client from local credentials."}
        print(json.dumps(result, indent=2))
        sys.exit(1)

    property_name = _resolve_property(prop)
    result = {
        "generated_at": datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "property": property_name,
        "date_range": {"start": start, "end": end},
        "totals": {
            "sessions": 0,
            "users": 0,
            "screen_page_views": 0,
            "event_count": 0,
            "purchase_revenue": 0.0,
            "select_item": 0,
            "view_item": 0,
            "add_to_cart": 0,
            "begin_checkout": 0,
            "purchase": 0,
        },
        "events": [],
        "error": None,
    }

    try:
        rows, quota = run_report(
            client,
            RunReportRequest(
                property=property_name,
                date_ranges=[DateRange(start_date=start, end_date=end)],
                metrics=[
                    Metric(name="sessions"),
                    Metric(name="totalUsers"),
                    Metric(name="screenPageViews"),
                    Metric(name="eventCount"),
                    Metric(name="purchaseRevenue"),
                ],
                return_property_quota=True,
            ),
        )
        if rows:
            row = rows[0]
            result["totals"]["sessions"] = metric_value(row, 0, int)
            result["totals"]["users"] = metric_value(row, 1, int)
            result["totals"]["screen_page_views"] = metric_value(row, 2, int)
            result["totals"]["event_count"] = metric_value(row, 3, int)
            result["totals"]["purchase_revenue"] = round(metric_value(row, 4, float), 2)
        if quota:
            result["quota"] = {
                "daily_consumed": quota.tokens_per_day.consumed if quota.tokens_per_day else None,
                "daily_remaining": quota.tokens_per_day.remaining if quota.tokens_per_day else None,
                "hourly_consumed": quota.tokens_per_hour.consumed if quota.tokens_per_hour else None,
                "hourly_remaining": quota.tokens_per_hour.remaining if quota.tokens_per_hour else None,
            }
    except Exception as exc:
        result["error"] = f"GA4 totals query failed: {exc}"

    if not result["error"]:
        try:
            event_filters = [
                FilterExpression(
                    filter=Filter(
                        field_name="eventName",
                        string_filter=Filter.StringFilter(
                            match_type=Filter.StringFilter.MatchType.EXACT,
                            value=event_name,
                        ),
                    )
                )
                for event_name in FUNNEL_EVENTS
            ]
            rows, _ = run_report(
                client,
                RunReportRequest(
                    property=property_name,
                    date_ranges=[DateRange(start_date=start, end_date=end)],
                    dimensions=[Dimension(name="eventName")],
                    metrics=[Metric(name="eventCount"), Metric(name="totalUsers")],
                    dimension_filter=FilterExpression(
                        or_group=FilterExpressionList(expressions=event_filters)
                    ),
                ),
            )
            for row in rows:
                event_name = row.dimension_values[0].value
                event_count = metric_value(row, 0, int)
                users = metric_value(row, 1, int)
                result["events"].append({
                    "event_name": event_name,
                    "event_count": event_count,
                    "users": users,
                })
                if event_name in result["totals"]:
                    result["totals"][event_name] = event_count
        except Exception as exc:
            result["error"] = f"GA4 event query failed: {exc}"

    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps(result, indent=2), encoding="utf-8")

    if args.json or not args.out:
        print(json.dumps(result, indent=2))

    sys.exit(1 if result["error"] else 0)


if __name__ == "__main__":
    main()
