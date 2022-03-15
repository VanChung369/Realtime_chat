import React,{useEffect,useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Submit = async (e) => {
    e.preventDefault();
   if(handleValidation())
   {
    const url ="http://localhost:8000/api/user/login";
    const { email,password } = form;
    const { data } = await axios.post(url, {
      email,
      password,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem(
        "chat-app",
        JSON.stringify(data.user)
      );
      navigate("/");
    }
   }
  }
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { password,email } = form;
    if (password === "") {
      toast.error(
        "Mat Khau Khong Dung.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error(
        "Email Khong Dung.",
        toastOptions
      );
    }
    return true;
  };
  return (
    <>
        <div className="layout">
          <div className="container d-flex flex-column">
            <div className="row align-items-center justify-content-center no-gutters min-vh-100">
              <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                <h1 className="font-bold text-center">Login</h1>
                <p className="text-center mb-6">Welcome To Login .</p>
                <form  action=""  className="mb-6" onSubmit={Submit}>
                <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter Email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-block btn-primary"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="text-center">
                Don't have an account yet ? <Link to="/Signup">Signup.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
    </>
  );
};

export default Login