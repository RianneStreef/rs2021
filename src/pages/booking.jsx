import React from "react";

import { Helmet } from "react-helmet";

const booking = () => {
  return (
    <div>
      <Helmet>
        <script
          type="text/javascript"
          src="https://login.smoobu.com/js/Settings/BookingToolIframe.js"
        >
          {BookingToolIframe.initialize({
            url: "https://login.smoobu.com/en/booking-tool/iframe/337000",
            baseUrl: "localhost:",
            target: "#apartmentIframeAll",
          })}
        </script>
      </Helmet>
      <iframe>
        <div id="apartmentIframeAll" />
      </iframe>
    </div>
  );
};

export default booking;
