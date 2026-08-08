#!/usr/bin/env python3
"""Pull GA4 campaign/source progress for North & Pearl order-goal traffic.

This reads only aggregate dimensions and metrics:
- session campaign
- session source/medium
- session manual ad content when available
- sessions, users, views, event count, revenue

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
        Metric,
        RunReportRequest,
    )
except Exception as exc:  # pragma: no cover - script dependency guard
    print(json.dumps({"error": f"Could not import GA4 dependencies: {exc}"}))
    sys.exit(1)


def parse_args():
    parser = argparse.ArgumentParser(description="GA4 order-goal campaign breakdown")
    parser.add_argument("--property", default="", help="GA4 property, e.g. properties/546565745")
    parser.add_argument("--start", default="", help="Start date YYYY-MM-DD")
    parser.add_argument("--end", default="", help="End date YYYY-MM-DD")
    parser.add_argument("--campaign", default="order_growth_august_2026", help="Campaign name to highlight")
    parser.add_argument("--out", default="", help="Optional output JSON file")
    parser.add_argument("--json", action="store_true", help="Print JSON")
    return parser.parse_args()


def metric_value(row, index, number_type=float):
    try:
        return number_type(row.metric_values[index].value)
    except Exception:
        return number_type()


def dimension_value(row, index):
    try:
        return row.dimension_values[index].value
    except Exception:
        return ""


def run_breakdown(client, property_name, start, end, dimensions):
    response = client.run_report(
        RunReportRequest(
            property=property_name,
            date_ranges=[DateRange(start_date=start, end_date=end)],
            dimensions=[Dimension(name=name) for name in dimensions],
            metrics=[
                Metric(name="sessions"),
                Metric(name="totalUsers"),
                Metric(name="screenPageViews"),
                Metric(name="eventCount"),
                Metric(name="purchaseRevenue"),
            ],
            limit=100,
            return_property_quota=True,
        )
    )
    rows = []
    for row in response.rows:
        rows.append(
            {
                **{dimension: dimension_value(row, index) for index, dimension in enumerate(dimensions)},
                "sessions": metric_value(row, 0, int),
                "users": metric_value(row, 1, int),
                "screen_page_views": metric_value(row, 2, int),
                "event_count": metric_value(row, 3, int),
                "purchase_revenue": round(metric_value(row, 4, float), 2),
            }
        )
    quota = response.property_quota
    return rows, {
        "daily_consumed": quota.tokens_per_day.consumed if quota and quota.tokens_per_day else None,
        "daily_remaining": quota.tokens_per_day.remaining if quota and quota.tokens_per_day else None,
        "hourly_consumed": quota.tokens_per_hour.consumed if quota and quota.tokens_per_hour else None,
        "hourly_remaining": quota.tokens_per_hour.remaining if quota and quota.tokens_per_hour else None,
    }


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
    property_name = _resolve_property(prop)
    client = _build_ga4_client()

    result = {
        "generated_at": datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "property": property_name,
        "date_range": {"start": start, "end": end},
        "highlight_campaign": args.campaign,
        "breakdowns": {},
        "highlight": {
            "sessions": 0,
            "users": 0,
            "screen_page_views": 0,
            "event_count": 0,
            "purchase_revenue": 0.0,
            "rows": [],
        },
        "error": None,
    }

    if not client:
        result["error"] = "Could not build GA4 client from local credentials."
    else:
        try:
            breakdown_specs = {
                "source_medium_campaign": ["sessionSourceMedium", "sessionCampaignName"],
                "content_campaign": ["sessionCampaignName", "sessionManualAdContent"],
                "landing_page_campaign": ["landingPagePlusQueryString", "sessionCampaignName"],
            }
            quota = None
            for key, dimensions in breakdown_specs.items():
                rows, quota = run_breakdown(client, property_name, start, end, dimensions)
                result["breakdowns"][key] = rows
                for row in rows:
                    campaign_values = [value for dim, value in row.items() if "campaign" in dim.lower()]
                    if args.campaign in campaign_values:
                        result["highlight"]["rows"].append({"breakdown": key, **row})
                        for metric in ["sessions", "users", "screen_page_views", "event_count", "purchase_revenue"]:
                            result["highlight"][metric] += row[metric]
            if quota:
                result["quota"] = quota
        except Exception as exc:
            result["error"] = f"GA4 campaign breakdown failed: {exc}"

    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps(result, indent=2), encoding="utf-8")

    if args.json or not args.out:
        print(json.dumps(result, indent=2))

    sys.exit(1 if result["error"] else 0)


if __name__ == "__main__":
    main()
