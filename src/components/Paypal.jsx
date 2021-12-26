import React, { useState } from "react";
import "../styles/Paypal.css";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import logo from "../images/icon.png";
import { Helmet } from "react-helmet";

const Paypal = () => {
  let [amount, setAmount] = useState(0.01);
  let [currency, setCurrency] = useState("EUR");

  const handleInput = (event) => {
    const newAmount = (event.target.amount = event.target.value);
    console.log("newAmount");
    console.log(newAmount);
    setAmount(newAmount);
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = (event.target.currency = event.target.value);
    console.log("change currency to: ");
    console.log(newCurrency);
    setCurrency(newCurrency);
  };

  const createOrder = (data, actions) => {
    console.log("creating order for");
    console.log(amount);
    console.log(currency);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const [success, setSuccess] = useState(false);

  const SCRIPT_PROVIDER_OPTIONS = {
    "client-id": "test",
    currency: currency,
  };

  console.log("SCRIPT_PROVIDER_OPTIONS");
  console.log(SCRIPT_PROVIDER_OPTIONS);

  const onApprove = (data, actions) => {
    console.log("order approved");

    return actions.order.capture().then(function (orderData) {
      // Full available details
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );

      setSuccess(true);
    });
  };

  // const onError = (err) => {
  //   console.log(err);
  // };

  return (
    <>
      <Helmet>
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}
        ></script>
      </Helmet>
      <div className="paypal-text">
        <div className="paypal-message">
          {success ? (
            <h1>Thank you for your transaction!</h1>
          ) : (
            <h1>Send me money! :) Mimi"</h1>
          )}
        </div>
        <img src={logo} alt="unicorn logo" className="paypal-logo" />
      </div>
      <div className={`paypal-amount${success ? " hidden" : ""}`}>
        <label htmlFor="amount">
          Amount
          <select onChange={handleCurrencyChange} defaultValue="EUR">
            <option value="EUR">Euro</option>
            <option value="USD">Dollar</option>
            <option value="GBP">Pound</option>
          </select>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={handleInput}
          />
        </label>
      </div>
      <div id="paypal-buttons" className={`${success ? " hidden" : ""}`}>
        <PayPalScriptProvider options={SCRIPT_PROVIDER_OPTIONS}>
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "silver",
              shape: "pill",
              label: "paypal",
            }}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </PayPalScriptProvider>
        <p>
          {amount}
          {currency}
        </p>
      </div>
    </>
  );
};

export default Paypal;
