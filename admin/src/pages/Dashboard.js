import React, {useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      (async () => {
        const {data} = await axios.get(`http://localhost:3000/api/user/${user?._id}`);
        console.log(data);
        setUser(data?.user);
        localStorage.setItem("user", JSON.stringify(data?.user));
      })();
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")){
      navigate("/");
    }
  }, []);

  const data = [
    {
      type: "Jan",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Feb",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Mar",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Apr",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "May",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Jun",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "July",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Aug",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Sept",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Oct",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Nov",
      sales: Math.floor(Math.random() * 100),
    },
    {
      type: "Dec",
      sales: Math.floor(Math.random() * 100),
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">${(user?.amount || 0).toFixed(0) || 0} </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6>
              <BsArrowDownRight /> {Math.floor(Math.random() * 100)}%
            </h6> */}
            {/* <p className="mb-0  desc">{new Date().getFullYear()} Income</p> */}
          </div>
        </div>
        {/* <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">${Math.floor(Math.random() * 1000)}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> {Math.floor(Math.random() * 100)}%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$ {Math.floor(Math.random() * 1000)}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> {Math.floor(Math.random() * 100)}%
            </h6>
            <p className="mb-0 desc">{new Date().getFullYear()} Income</p>
          </div>
        </div> */}
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Monthly Income</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
