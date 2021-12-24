import React from "react";
import Layout from "../components/layout";
import Client from "shopify-buy";
import { Helmet } from "react-helmet";

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;

  async function checkout() {
    // build a client
    var client = ShopifyBuy.buildClient({
      storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
      domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
    });

    var ui = ShopifyBuy.UI.init(client);

    (function () {
      var scriptURL =
        "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }
      function loadScript() {
        var script = document.createElement("script");
        script.async = true;
        script.src = scriptURL;
        (
          document.getElementsByTagName("head")[0] ||
          document.getElementsByTagName("body")[0]
        ).appendChild(script);
        script.onload = ShopifyBuyInit;
      }
      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain: "vts-web-design.myshopify.com",
          storefrontAccessToken: "281301e921b8f1b32c5ab72d8c9ae41f",
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
          ui.createComponent("product", {
            id: "7518555111654",
            node: document.getElementById("product-component-1640354344877"),
            moneyFormat: "%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D",
          });
        });
      }
    })();

    // create a checkout
    const checkout = await client.checkout.create();

    // create an array of line items
    const variantId = product.shopifyId;
    console.log("variantId");
    console.log(variantId);
    const lineItemsToAdd = [{ variantId, quantity: 1 }];

    // add line items to the checkout
    const checkoutId = checkout.id;
    const newCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    // finish the checkout by visiting webUrl
    window.open(checkout.webUrl);
  }

  return (
    <>
      <Helmet>
        <script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js" />
      </Helmet>
      <Layout>
        <div className="product-wrap">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <button onClick={checkout}>
            Buy for {product.priceRangeV2.maxVariantPrice.amount}
          </button>
          <div id="product-component-1640354344877"></div>
        </div>
      </Layout>
    </>
  );
};
export default ProductTemplate;
