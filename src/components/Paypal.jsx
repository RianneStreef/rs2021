import React, { useState } from "react";
import "../styles/Paypal.css";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import logo from "../images/icon.png";
import { Helmet } from "react-helmet";

const Paypal = () => {
  let amount = "0.01";

  const handleInput = (event) => {
    const newAmount = (event.target.amount = event.target.value);
    console.log(typeof newAmount);
    console.log(newAmount);
    setNewAmount(newAmount);
  };

  const setNewAmount = (newAmount) => {
    amount = newAmount;
    console.log("amount");
    console.log(amount);
  };

  const createOrder = (data, actions) => {
    console.log("creating order");
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

  const SCRIPT_PROVIDER_OPTIONS = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "EUR",
  };

  const onApprove = (data, actions) => {
    console.log("order approved");

    return actions.order.capture().then(function (orderData) {
      // Full available details
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2)
      );

      // Show a success message within this page, e.g.
      const element = document.getElementById("paypal-message");
      element.innerHTML = "";
      element.innerHTML = "Thank you for your payment!";
    });
  };

  // const onError = (err) => {
  //   console.log(err);
  // };

  return (
    <>
      <Helmet></Helmet>
      <div className="paypal-text">
        <h1 className="paypal-message" id="paypal-message">
          Send me money! :) Mimi
        </h1>
        <img src={logo} alt="unicorn logo" className="paypal-logo" />
      </div>
      <div className="paypal-amount">
        <label htmlFor="amount">
          Amount € :
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={handleInput}
          />
        </label>
      </div>
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
    </>
  );
};

export default Paypal;
