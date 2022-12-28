if (!customElements.get('product-model')) {
  class ProductModel extends customElements.get('deferred-media') {
    constructor() {
      super();
    }

    loadContent() {
      super.loadContent();

      Shopify.loadFeatures([
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: this.setupModelViewerUI.bind(this)
        }
      ]);
    }

    setupModelViewerUI(errors) {
      if (errors) return;

      this.modelViewerUI = new Shopify.ModelViewerUI(
        this.querySelector('model-viewer')
      );
    }
  }

  customElements.define('product-model', ProductModel);
}

window.ProductModel = {
  loadShopifyXR() {
    Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: this.setupShopifyXR.bind(this)
      }
    ]);
  },

  setupShopifyXR(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', () =>
        this.setupShopifyXR()
      );
      return;
    }

    document
      .querySelectorAll('[id^="ProductJSON-"]')
      .forEach(modelJSON => {
        window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
        modelJSON.remove();
      });
    window.ShopifyXR.setupXRElements();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  window.ProductModel?.loadShopifyXR();
});
