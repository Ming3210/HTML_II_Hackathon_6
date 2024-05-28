import React from "react";
import ShoppingCart from "./components/ShoppingCart";
import Payment from "./components/Payment";

export default function App() {
  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <ShoppingCart></ShoppingCart>
          <Payment></Payment>
        </div>
      </div>
    </div>
  );
}
