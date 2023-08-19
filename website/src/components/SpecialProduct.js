import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = ({item}) => {
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <img src={item?.images[0]?.url} className="img-fluid" alt="product image" style={{width:"300px",height:"300px", objectFit:"cover", objectPosition:"center", borderRadius:"10px"}} />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{item?.brand}</h5>
              <h6 className="title">
                {item?.title?.length > 20
                  ? item?.title?.slice(0, 20) + "..."
                  : item?.title
                  ? item?.title + "..."
                  : "Product Title"}
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={Math.floor(Math.random() * 5) + 1}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">{item?.price}</span>{" "}
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {item?.quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: Math.floor(Math.random() * 100) + 1 + "%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
