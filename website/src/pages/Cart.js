import React , { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";

import axios from "axios";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }
  , []);

  useEffect(() => {
    if(user){
      const fetchCart = async () => {
        const { data } = await axios.get(`/api/cart/${user?._id}`);
        console.log(data);
        setCart(data);
      };
      fetchCart();
    }
  }, [user]);



  const Card = ({ item }) => {
    return (
      <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
        <div className="cart-col-1 gap-15 d-flex align-items-center">
          <div className="w-25">
            <img src={item?.product?.images[0]?.url} alt="" className="img-fluid" />
          </div>
          <div className="w-75">
            <h5 className="mb-0">{item?.product?.title}</h5>
            <p className="mb-0">Brand: {item?.product?.brand}</p>
            <p className="mb-0">Quantity: {item?.count}</p>
          </div>
        </div>
        <div className="cart-col-2">
          <h5 className="price">$ {item?.product?.price}</h5>
        </div>
      
        <div className="cart-col-3 d-flex align-items-center gap-15">
          <div>
            <input
              className="form-control"
              type="number"
              name=""
              min={1}
              max={10}
              id=""
              value={item?.count}
              readOnly
            />
          </div>
          <div>
            <AiFillDelete className="text-danger " />
          </div>
        </div>
        <div className="cart-col-4">
          <h5 className="price">{item?.price * item?.count}</h5>
        </div>
    </div>
    );
  };


  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>

             {cart?.products?.map((item) => (
              <Card item={item} key={item?._id} />
            ))}
           
            
            
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <p>Total: {cart?.cartTotal}</p>
                <p>After Discount: <span style={{ fontSize: 20 , fontWeight: 'bold'}}>{cart?.totalAfterDiscount}</span> and It's will be applied on checkout</p>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
