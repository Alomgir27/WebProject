import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import axios from "axios";
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if(user){
      const fetchWishlist = async () => {
        const { data } = await axios.get(`/api/wishlist/${user?._id}`);
        console.log(data);
        setWishlist(data);
      };
      fetchWishlist();
    }
  }, [user]);

  const handleRemove = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/wishlist/${user?._id}`, { data: { productId: id } })
      .then((res) => {
        console.log(res.data);
        // alert("Item Removed from Wishlist");
        toast.success("Item Removed from Wishlist.");
        setTimeout(()=> {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  const Card = ({ item }) => {
    return (
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <button  onClick={(e) => handleRemove(e, item?._id)}>
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
              </button>
              <div className="wishlist-card-image">
                <img
                  src={item?.images[0]?.url}
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  {item?.brand} {item?.title}
                </h5>
                <p className="description">
                 {item?.description?.substring(0, 100)}...
              </p>
                <h6 className="price">{item?.price}</h6>
              </div>
            </div>
          </div>
    );
  }

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      {wishlist?.length > 0 ? (
        <Container class1="wishlist-wrapper home-wrapper-2 py-5">
          <div className="row">
            {wishlist?.map((item) => <Card item={item} key={item?._id} />)}
          </div>
         </Container>
      ) : (
        <Container class1="wishlist-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <h4 className="text-center">No Items in Wishlist</h4>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Wishlist;
