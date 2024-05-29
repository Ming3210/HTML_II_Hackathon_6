import React, { useEffect, useState } from "react";

interface Cart {
  id: number;
  name: string;
  price: string;
  status: boolean;
  image: string;
  quantity: number;
}

interface PaymentProps {
  cart: Cart[];
}

export default function Payment() {
  const [cartLocal, setCartLocal] = useState<Cart[]>(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocal));
  }, [cartLocal]);

  const deleteFood = (id: number) => {
    const updatedCartLocal = cartLocal.filter((item) => item.id !== id);
    setCartLocal(updatedCartLocal);
    localStorage.setItem("cart", JSON.stringify(updatedCartLocal));
  };

  const totalPrice = cartLocal.reduce(
    (total, item) => total + parseInt(item.price) * item.quantity,
    0
  );

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h1 className="panel-title">Your Cart</h1>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "4%" }}>STT</th>
                <th>Name</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "4%" }}>Quantity</th>
                <th style={{ width: "25%" }}>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              {cartLocal.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <a
                      className="label label-danger delete-cart-item"
                      onClick={() => deleteFood(item.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot id="my-cart-footer">
              <tr>
                <td colSpan={4}>
                  There are <b>{cartLocal.length}</b> items in your shopping
                  cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                  {totalPrice} USD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="alert alert-success" role="alert" id="mnotification">
        Add to cart successfully
      </div>
    </div>
  );
}
