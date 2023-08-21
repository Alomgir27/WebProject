import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.orderbyuser);
  console.log(useSelector((state) => state.auth.orderbyuser));
  // console.log(orderState)/;
  const data1 = [];
  if(orderState != undefined){
  for (let i = 0; i < orderState?.length; i++) {
    for (let j = 0; j < orderState[i].products.length; ++j){
      data1.push({
        key: i + 1,
        name: orderState[i].products[j]?.product?.title,
        brand: orderState[i].products[j]?.product?.brand,
        count: orderState[i].products[j]?.count,
        amount: orderState[i].products[j]?.product?.price,
        color: orderState[i].products[j]?.product?.price,
        date: orderState[i].products[j]?.product?.createdAt,
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }
}
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
