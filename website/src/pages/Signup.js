import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    await axios.post("/api/user/register", { name, email, mobile, password })
      .then((res) => {
        console.log(res.data);
        // alert("User Created Successfully");
        toast.success('User Created Successfully.');
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });

  };
  


  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <CustomInput type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={mobile} onChange={(e) => setMobile(e.target.value)}
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" onClick={submitHandler}>Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
