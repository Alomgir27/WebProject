import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const Checkout = () => {

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    const navigate = useNavigate();
  
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

    const submitHandler = async (e) => {
      e.preventDefault();
      if(!cart){
        alert('No Item has cartList')
        return;
      }
      if(user?._id){
        await axios.post(`/api/order`, { userId: user?._id })
        .then((res) => {
          console.log(res.data);
          // alert("Order Placed");
          toast.success("Your Order has been placed");
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
      } else {
        // alert("Please Login to place order");
        toast.error("Please Login to place order");
      }
    };


  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={submitHandler}
                className="d-flex gap-15 flex-wrap justify-content-between"

              >
                <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value={'bangladesh'}>bangladesh</option>
                    <option value={'india'}>india</option>
                    <option value={'pakistan'}>pakistan</option>
                    <option value={'nepal'}>nepal</option>

                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    required
                  />
                </div>
                {/* <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    required
                  />
                </div> */}
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    required
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    required
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    required
                  />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value={'dhaka'}>Dhaka</option>
                    <option value={'Khulna'}>Khulna</option>
                    <option value={'Barisal'}>Barisal</option>
                    <option value={'Rajshahi'}>Rajshahi</option>
                    <option value={'sylhet'}>Sylhet</option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    required
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button className="button" type="submit">
                       Proceed to Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            
            {cart?.products?.map((item, index) => (
              <div className="border-bottom py-4" key={index}>
                <div className="d-flex gap-10 mb-2 align-align-items-center">
                  <div className="w-75 d-flex gap-10">
                    <div className="w-25 position-relative">
                      <span
                        style={{ top: "-10px", right: "2px" }}
                        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                      >
                        {item?.count}
                      </span>
                      <img className="img-fluid" src={item?.product?.images[0]?.url} alt="" />
                    </div>
                    <div>
                      <h5 className="total-price">{item?.product?.title}</h5>
                      <p className="total-price">{item?.product?.brand}</p>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="total">{item?.price * item?.count}</h5>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Total</p>
                <p className="total-price">{cart?.cartTotal}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Free</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="mb-0 total">Discount</p>
                <p className="mb-0 total-price">{((cart?.cartTotal - cart?.totalAfterDiscount) / cart?.cartTotal * 100).toFixed(0)}%</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">{cart?.totalAfterDiscount}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
