import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch,  } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import axios from "axios";
const Header = ({search, setSearch}) => {
  const [couponData, setCouponData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCoupon = async () => {
      const { data } = await axios.get("/api/coupon");
      console.log(data);
      setCouponData(data);
    };
    fetchCoupon();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      const fetchUser = async () => {
        const { data } = await axios.get(`/api/user/${user?._id}`);
        console.log(data);
        setUser(data?.user);
        localStorage.setItem("user", JSON.stringify(data?.user));
      };
      fetchUser();
      
    }
  }, []);
  
  useEffect(() => {
    if(user?._id){
      const fetchCart = async () => {
        const { data } = await axios.get(`/api/cart/${user?._id}`);
        console.log(data);
        setCart(data);
      };
      fetchCart();
    }
  }, [user?._id]);


  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              {couponData?.map((coupon) => (
                <div className="d-flex align-items-center gap-15" key={coupon?._id}>
                  <span className="me-2 text-white">Get {coupon?.discount}% Discount on {coupon?.name} </span>
                  <p className="mb-0 text-white">Offer ends in {new Date(coupon?.expiry).getDate() - new Date().getDate()} days. Hurry Up!</p>
               </div>
              ))}
            </div>
            <div className="col-6">
              <div className="header-top-strip-links d-flex justify-content-end">
                {user !== null ? (
                  <div className="d-flex align-items-center gap-15">
                    <p className="text-white mb-0">Welcome {user?.firstname}</p> <b className="text-white">|</b>
                    <p className="text-white mb-0">${(user?.amount).toFixed(0)}</p>
                    <button className="btn btn-danger" onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                      window.location.reload();
                    }
                    }>
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink to="/login" className="text-white">
                    Login
                  </NavLink>
                )}
             </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">
                  WART <span className="text-danger">SHOP</span>
                </Link>
              </h2>
            </div>
            <div className="col-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-10">
                {/* <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-12 text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0 ms-3">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white me-3"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src='https://img.icons8.com/ios/50/ffffff/shopping-cart--v1.png' alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cart?.products?.length || 0}</span>
                      <p className="mb-0">$ {cart?.cartTotal || 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    {/* <NavLink to="/blogs">Blogs</NavLink> */}
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
