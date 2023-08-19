import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import axios from "axios";


const ProductCard = ({ item, grid }) => {
  let location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (user) {
      console.log("wishlist");
      await axios
        .post("/api/wishlist", { productId: item?._id, userId: user?._id })
        .then((res) => {
          console.log(res.data);
          alert("Added to Wishlist");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    } else {
      alert("Please Login to add to Wishlist");
    }
  };


  return (
    <>
      <div
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "gr-3"
        } `}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? `/product/${item?._id}`
              : location.pathname == "/product/:id"
              ? `/product/${item?._id}`
              : `/product/${item?._id}`
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent" type="button" onClick={handleWishlist}>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={item?.images[0]?.url} className="img-fluid" alt="product image" />
            <img src={item?.images[0]?.url} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{item?.brand}</h6>
            <h5 className="product-title">
              {item?.title?.length > 20
                ? item?.title?.slice(0, 20) + "..."
                : item?.title
                ? item?.title + "..."
                : "Product Title"
                }
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={Math.floor(Math.random() * 5) + 1}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              {item?.description?.length > 100
                ? item?.description?.slice(0, 100) + "..."
                : item?.description
                ? item?.description + "..."
                : "Product Description"
                }
            </p>
            <p className="price">{item?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
