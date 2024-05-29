import React, { useEffect, useState } from "react";
import Cake from "../assets/Image/Cake.jpg";
import Hamburger from "../assets/Image/Hamburger.jpg";
import Bread from "../assets/Image/bread.jpg";
import Pizza from "../assets/Image/pizza.jpg";
import Payment from "./Payment";
interface Food {
  id: number;
  name: string;
  price: string;
  status: boolean;
  image: string;
  quantity: number;
}

interface Cart {
  id: number;
  price: string;
  status: boolean;
  image: string;
  quantity: number;
  name: string;
}

// let food: Food[] = [
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Pizza",
//     price: "15 USD",
//     status: false,
//     image: Pizza,
//     quantity: 0,
//   },
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Hamburger",
//     price: "15 USD",
//     status: true,
//     image: Hamburger,
//     quantity: 15,
//   },
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Bread",
//     price: "20 USD",
//     status: true,
//     image: Bread,
//     quantity: 15,
//   },
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Cake",
//     price: "10 USD",
//     status: true,
//     image: Cake,
//     quantity: 15,
//   },
// ];
// localStorage.setItem("foods", JSON.stringify(food));

export default function RenderFood() {
  const [foodLocal, setFoodLocal] = useState<Food[]>(() => {
    const data = localStorage.getItem("foods");
    const food = data ? JSON.parse(data) : [];
    return food;
  });

  const [cartLocal, setCartLocal] = useState<Cart[]>(() => {
    const data = localStorage.getItem("cart");
    const cart = data ? JSON.parse(data) : [];
    return cart;
  });

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foodLocal));
  }, [foodLocal]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocal));
  }, [cartLocal]);

  const add = (id: number) => {
    const food = foodLocal.find((itemFood) => itemFood.id === id);
    if (food && food.quantity > 0) {
      const foodCart = cartLocal.find((cartItem) => cartItem.id === id);
      if (!foodCart) {
        setCartLocal((prevCart) => [...prevCart, { ...food, quantity: 1 }]);
      } else {
        const updatedCartLocal = cartLocal.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        setCartLocal(updatedCartLocal);
      }
      // Update foodLocal only if an item is added to the cart
      setFoodLocal((prevFoodLocal) =>
        prevFoodLocal.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  return (
    <div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h1 className="panel-title">List foods</h1>
          </div>
          <div className="row">
            <div className="panel-body" id="list-product">
              {foodLocal.map((item) => (
                <div key={item.id} className="media product">
                  <div className="media-left">
                    <a href="#">
                      <img
                        className="media-object"
                        src={item.image}
                        alt={item.name}
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{item.name}</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      At dicta asperiores veniam repellat unde debitis quisquam
                      magnam magni ut deleniti!
                    </p>
                    {item.status ? (
                      <>
                        <input
                          name="quantity-product-1"
                          type="number"
                          value={item.quantity}
                        />
                        <a
                          onClick={() => add(item.id)}
                          data-product={1}
                          className="price"
                        >
                          {item.price}
                        </a>
                      </>
                    ) : (
                      <span className="price">{item.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-body" id="list-product"></div>
        </div>
      </div>
      <Payment></Payment>
      {/* <Payment cart={cartLocal} /> */}
    </div>
  );
}
