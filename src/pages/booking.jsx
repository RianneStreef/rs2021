import React from "react";

const booking = () => {
  let BookingToolIframe = {
    initialize: function (oJson) {
      var self = this;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", oJson.url);
      xhr.onload = function () {
        if (xhr.status === 200) {
          var oResponse = JSON.parse(xhr.responseText);

          if (true === oResponse.success) {
            var oContainer = document.querySelector(oJson.target);
            oContainer.innerHTML = oContainer.innerHTML + oResponse.html;

            self.loadJs(oContainer, oJson.baseUrl);

            function checkFlag() {
              if ("undefined" === typeof iFrameResize) {
                window.setTimeout(checkFlag, 750);
              } else {
                iFrameResize(
                  { heightCalculationMethod: "lowestElement" },
                  "#" + oContainer.querySelector("iframe").getAttribute("id")
                );
              }
            }
            checkFlag();
          } else {
            console.log(oResponse);
          }
        } else {
          console.log("Request failed.  Returned status of " + xhr.status);
        }
      };
      xhr.send();
    },

    loadJs: function (oContainer, smoobuBaseUrl) {
      var jsFiles = [
        {
          url: "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.16/iframeResizer.min.js",
        },
      ];

      if ("undefined" == typeof jQuery) {
        jsFiles.push({
          url: smoobuBaseUrl + "/js/limitless/core/libraries/jquery.min.js",
        });
      }
      BookingToolIframe.loadJavascript(oContainer, jsFiles);
    },

    loadJavascript: function (oContainer, aFiles) {
      if ("undefined" == aFiles.pop || 0 == aFiles.length) {
        return;
      }

      var oFile = aFiles.pop();

      var callback = function () {
        BookingToolIframe.loadJavascript(oContainer, aFiles);
      };

      BookingToolIframe.initJavascriptElement(oContainer, oFile, callback);
    },

    initJavascriptElement: function (oCalenderWidget, oFile, callback) {
      var oScript = document.createElement("script");
      oScript.setAttribute("type", "text/javascript");

      if (undefined !== oFile.url) {
        oScript.onload = function () {
          callback();
        };
      }

      if (undefined !== oFile.url) {
        oScript.setAttribute("src", oFile.url);
      } else {
        oScript.textContent = oFile.text;
      }

      oCalenderWidget.appendChild(oScript);

      if (undefined === oFile.url) {
        callback();
      }
    },
  };

  BookingToolIframe.initialize({
    url: "https://login.smoobu.com/en/booking-tool/iframe/337000",
    baseUrl: "https://login.smoobu.com",
    target: "#apartmentIframeAll",
  });

  return (
    <div>
      <iframe>
        <div id="apartmentIframeAll" />
      </iframe>
    </div>
  );
};

export default booking;
