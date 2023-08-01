import React from 'react'

import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
;

const CheckoutPage = () => {
  return (
      <div>
          <CheckoutSteps active={1} />
          <Checkout />
      </div>
  );
}

export default CheckoutPage