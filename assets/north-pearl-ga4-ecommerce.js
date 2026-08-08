(function () {
  var fired = {};

  function readProductPayload() {
    var node = document.querySelector('[data-np-product-analytics]');
    if (!node) return null;

    try {
      return JSON.parse(node.textContent);
    } catch (error) {
      return null;
    }
  }

  function sendGa4Event(eventName, payload, key) {
    if (key && fired[key]) return;
    if (typeof window.gtag !== 'function') return;

    if (key) fired[key] = true;
    window.gtag('event', eventName, payload);
  }

  function normalizeCartItem(item) {
    if (!item) return null;

    return {
      item_id: String(item.sku || item.variant_id || item.id || ''),
      item_name: item.product_title || item.title || 'North & Pearl jewelry',
      item_variant: item.variant_title || undefined,
      price: typeof item.final_price === 'number' ? item.final_price / 100 : undefined,
      quantity: item.quantity || 1,
    };
  }

  function sendProductView() {
    var product = readProductPayload();
    if (!product) return;

    sendGa4Event(
      'view_item',
      {
        currency: product.currency,
        value: product.price,
        items: [product],
      },
      'view_item:' + product.item_id
    );
  }

  function bindAddToCart() {
    if (typeof subscribe === 'undefined' || typeof PUB_SUB_EVENTS === 'undefined') return;

    subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
      if (!event || event.source !== 'product-form') return;

      var item = normalizeCartItem(event.cartData);
      if (!item) return;

      sendGa4Event('add_to_cart', {
        currency: window.Shopify?.currency?.active || 'USD',
        value: item.price ? item.price * item.quantity : undefined,
        items: [item],
      });
    });
  }

  function bindBeginCheckout() {
    document.addEventListener('click', function (event) {
      var checkoutButton = event.target.closest('[name="checkout"], .cart__checkout-button');
      if (!checkoutButton) return;

      fetch((window.routes?.cart_url || '/cart') + '.js')
        .then(function (response) {
          return response.ok ? response.json() : null;
        })
        .then(function (cart) {
          if (!cart || !Array.isArray(cart.items)) return;

          sendGa4Event('begin_checkout', {
            currency: cart.currency || window.Shopify?.currency?.active || 'USD',
            value: typeof cart.total_price === 'number' ? cart.total_price / 100 : undefined,
            items: cart.items.map(normalizeCartItem).filter(Boolean),
          });
        })
        .catch(function () {});
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    sendProductView();
    bindAddToCart();
    bindBeginCheckout();
  }, { once: true });
})();
