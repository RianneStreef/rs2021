import React from "react";
import { Helmet } from "react-helmet";

const Shopify = (props) => {
  console.log(props.data);

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
        ui.createComponent("collection", {
          id: "396238815462",
          node: document.getElementById("collection-component-1640519897851"),
          moneyFormat: "%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                    width: "calc(25% - 20px)",
                  },
                  img: {
                    height: "calc(100% - 15px)",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    top: "0",
                  },
                  imgWrapper: {
                    "padding-top": "calc(75% + 15px)",
                    position: "relative",
                    height: "0",
                  },
                },
                button: {
                  ":hover": {
                    "background-color": "#bd0be0",
                  },
                  "background-color": "#d20cf9",
                  ":focus": {
                    "background-color": "#bd0be0",
                  },
                },
              },
              text: {
                button: "Add to cart",
              },
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  ":hover": {
                    "background-color": "#bd0be0",
                  },
                  "background-color": "#d20cf9",
                  ":focus": {
                    "background-color": "#bd0be0",
                  },
                },
              },
              text: {
                button: "Add to cart",
              },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  ":hover": {
                    "background-color": "#bd0be0",
                  },
                  "background-color": "#d20cf9",
                  ":focus": {
                    "background-color": "#bd0be0",
                  },
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
            toggle: {
              styles: {
                toggle: {
                  "background-color": "#d20cf9",
                  ":hover": {
                    "background-color": "#bd0be0",
                  },
                  ":focus": {
                    "background-color": "#bd0be0",
                  },
                },
              },
            },
          },
        });
      });
    }
  })();

  return (
    <>
      <Helmet></Helmet>
      <div>
        <h1>My products</h1>
        <div id="collection-component-1640519897851"></div>
      </div>
    </>
  );
};

export default Shopify;
