import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [orderedProduct, setorderedProduct] = useState(true);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [zoomData, setZoomData] = useState({
    img: "",
    width: 600,
    height: 600,
    zoomWidth: 600,
  });


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);


  useEffect(() => {
    const fetchCoupon = async () => {
      const { data } = await axios.get("/api/coupon");
      console.log(data);
      setCouponData(data);
    };
    fetchCoupon();
  }, []);


  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${params?.id}`);
      console.log(data);
      setProduct(data);
      setZoomData({ ...zoomData, img: data?.images[0]?.url });
      setLoading(false);
    };
    if (params?.id) {
      fetchProduct();
    }
  }, [params]);


  const handleAddToCart = () => {
    if (user) {
      console.log("cart");
      axios
        .post("/api/cart", {
          productId: product?._id,
          userId: user?._id,
          count: quantity,
          discount: couponData[0]?.discount,
        })
        .then((res) => {
          console.log(res.data);
          // alert("Added to Cart");
          toast.success("Added to Cart");

          setTimeout(() => {
            navigate("/cart");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    } else {
      // alert("Please Login to add to Cart");
      toast.error("Please Login to add to Cart");
    }
  }

 

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {
    setShowModal(false);
  }



  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                {loading && !product ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : (
                   zoomData?.url !== "" && <ReactImageZoom {...zoomData} />
                )}
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src={product?.images[0]?.url}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {product?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{product?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={Math.floor(Math.random() * 5) + 1}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">({product?.ratings?.length})</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">{product?.slug}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{product?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{product?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{product?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">{product?.quantity}</p>
                </div>
                <div className="d-flex gap-10 flex-center my-2">
                  <h3 className="product-heading">Sold : </h3>
                  <p className="product-data">{product?.sold}</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color />
                </div> */}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity : </h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      value={quantity}
                      onChange={(e) => {
                        if(e.target.value > product?.quantity){
                          alert("Quantity is greater than available quantity");
                          return;
                        }
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      type="button"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="button signup"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {}}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  {/* <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div> */}
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        `${window.location.origin}/product/${product?._id}`
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
               {product?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={product?.totalratings}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on {product?.ratings?.length} reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard item={product} />
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-2 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-3">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={product?.images[0]?.url} className="img-fluid rounded-3" alt="" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3 p-2">{product?.title}</h6>
                  <p className="mb-1 p-2">Price: {product?.price}</p>
                  <p className="mb-1 p-2 ">Color: {product?.color?.length > 0 && product?.color[0]}</p>
                  <p className="mb-1 p-2">Quantity: {quantity}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button 
              type="button" 
              className="button" 
              data-bs-dismiss="modal" 
              onClick={() => navigate("/cart")}
              >
                   View My Cart
              </button>
              <button
                type="button"
                className="button signup"
                data-bs-dismiss="modal"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                   Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <button
                data-bs-dismiss="modal"
                onClick={() => {
                  navigate("/product");
                }}
                style={{ color: "#000", textDecoration: "underline", border: "none", background: "none" }}
              >
                  Continue To Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
