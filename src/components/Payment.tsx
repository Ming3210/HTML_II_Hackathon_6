import React, { useState } from "react";

interface Food {
  id: number;
  name: string;
  price: string;
  status: boolean;
  image: string;
  quantity: number;
}

export default function Payment() {
  const [foodLocal, setFoodLocal] = useState<Food[]>(() => {
    const data = localStorage.getItem("foods");
    const listFood = data ? JSON.parse(data) : [];
    return listFood;
  });
  const deleteFood = () => {};
  return (
    <div>
      <div>
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
                  <tr>
                    <th scope="row">1</th>
                    <td>Cake</td>
                    <td>10 USD</td>
                    <td>
                      <input
                        name="cart-item-quantity-1"
                        type="number"
                        defaultValue={15}
                      />
                    </td>
                    <td>
                      <a
                        className="label label-info update-cart-item"
                        data-product=""
                      >
                        Update
                      </a>
                      <a
                        className="label label-danger delete-cart-item"
                        data-product=""
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Hamburger</td>
                    <td>15 USD</td>
                    <td>
                      <input
                        name="cart-item-quantity-1"
                        type="number"
                        defaultValue={32}
                      />
                    </td>
                    <td>
                      <a
                        className="label label-info update-cart-item"
                        data-product=""
                      >
                        Update
                      </a>
                      <a
                        className="label label-danger delete-cart-item"
                        data-product=""
                        onClick={deleteFood}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot id="my-cart-footer">
                  <tr>
                    <td colSpan={4}>
                      There are <b>2</b> items in your shopping cart.
                    </td>
                    <td colSpan={2} className="total-price text-left">
                      630 USD
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
      </div>
    </div>
  );
}
