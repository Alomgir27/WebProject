import React , {useState} from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    await axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        // alert("Login Successfully");
        toast.success("Login Successfully");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                     <Link to="/signup" className="button signup">
                         SignUp
                     </Link>
                    <button className="button border-0" type="submit" onClick={submitHandler}>
                      Login
                    </button>
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

export default Login;
