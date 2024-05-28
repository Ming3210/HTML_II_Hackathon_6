import React, { useEffect, useState } from "react";
import Cake from "../assets/Image/Cake.jpg";
import Hamburger from "../assets/Image/Hamburger.jpg";
import Bread from "../assets/Image/bread.jpg";
import Pizza from "../assets/Image/pizza.jpg";

// type Food = {
//     id: number;
//     name: string;
//     price: string;
//     status: boolean;
//     image: string;
//     quantity: number;
// };

interface Cart {
  id: number;
  price: string;
  status: boolean;
  image: string;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  price: string;
  status: boolean;
  image: string;
  quantity: number;
}
// let foods: Food[] = [
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
// localStorage.setItem("foods", JSON.stringify(foods));

export default function ShoppingCart() {
  const [active, setActive] = useState<boolean>(false);
  const [foodLocal, setFoodLocal] = useState<Food[]>(() => {
    const data = localStorage.getItem("foods");
    const listFood = data ? JSON.parse(data) : [];
    return listFood;
  });
  const [cartLocal, setCartLocal] = useState<Cart[]>(() => {
    const data = localStorage.getItem("cart");
    const cart = data ? JSON.parse(data) : [];
    return cart;
  });
  const [quantity, setQuantity] = useState<number>(0);

  const changeInput = (id: any, e: any) => {
    const newQuantity = e.target.value;
    foodLocal.map((item) => {
      if (item.id == id) {
        item.quantity = newQuantity;
      }
      localStorage.setItem("foods", JSON.stringify(foodLocal));
    });
    setActive(!active);
  };
  useEffect(() => {
    // This code will run whenever foodLocal or cartLocal changes
    localStorage.setItem("foods", JSON.stringify(foodLocal));
    localStorage.setItem("cart", JSON.stringify(cartLocal));
    console.log(active); // If you need to log active state change
  }, [active]); // Dependencies to watch for changes
  const add = (id: any) => {
    setActive(!active);
    foodLocal.map((item) => {
      if (item.id == id) {
        item.quantity -= 1;
        const itemInCart = cartLocal.find(
          (cartItem) => cartItem.id === item.id
        );
        if (!itemInCart) {
          cartLocal.push({
            id: item.id,
            price: item.price,
            status: item.status,
            image: item.image,
            quantity: 1,
          });
        } else {
          itemInCart.quantity += 1;
        }
      }
    });

    localStorage.setItem("foods", JSON.stringify(foodLocal));
    localStorage.setItem("cart", JSON.stringify(cartLocal));
    console.log(active);
  };
  return (
    <div>
      <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List foods</h1>
            </div>
            <div className="panel-body" id="list-product">
              <div>
                {foodLocal.map((item: Food) => {
                  if (item.status == true) {
                    return (
                      <div key={item.id} className="media product">
                        <div className="media-left">
                          <a href="#">
                            <img
                              className="media-object"
                              src={item.image}
                              alt="pizza"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading">{item.name}</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. At dicta asperiores veniam repellat unde
                            debitis quisquam magnam magni ut deleniti!
                          </p>
                          <input
                            onClick={(e) => {
                              changeInput(item.id, e);
                            }}
                            name="quantity-product-1"
                            type="number"
                            defaultValue={item.quantity}
                          />
                          <a
                            onClick={() => {
                              add(item.id);
                            }}
                            data-product={1}
                            className="price"
                          >
                            {item.price}{" "}
                          </a>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={item.id} className="media product">
                        <div className="media-left">
                          <a href="#">
                            <img
                              className="media-object"
                              src={item.image}
                              alt="pizza"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="media-heading">{item.name}</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. At dicta asperiores veniam repellat unde
                            debitis quisquam magnam magni ut deleniti!
                          </p>
                          <span className="price"> {item.price}</span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
