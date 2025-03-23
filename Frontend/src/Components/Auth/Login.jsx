import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Home/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  // context api access
  // use navigation
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(""); // State to display messages
  const [wait, setWait] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait("wait");
    try {
      const response = await axios.post(
        "https://travelbudgetplanner-sywj.onrender.com/user/signin",
        formData
      );
      // console.log("Login Successful:", response.data);
      setMsg("Login Successful!");
      localStorage.setItem(
        "isLogin",
        JSON.stringify({
          email: response?.data.user.email,
          id: response?.data.user.id,
          name: response?.data.user.name,
          username: response?.data.user.username,
          accessToken: response?.data.AccessToken,
        })
      );
      console.log(response);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Login Failed!";
      setMsg(errorMessage);
    } finally {
      setWait("");
    }
  };
  // Redirect to the dashboard
  useEffect(() => {
    if (msg === "Login Successful!") {
      navigate("/dashboard");
    }
  }, [msg, navigate]);

  return (
    <>
      <Navbar />

      {/* msg div */}
      {msg !== "" && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h1 className="text-lg font-bold mb-4 px-20">{msg}</h1>
            {msg != "" && (
              <button
                onClick={() => setMsg("")}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-28">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#d77a61]">

            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#d77a61] sm:text-sm/6"

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-[#d77a61] hover:text-[#d77a61]"
                  >

                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#d77a61] sm:text-sm/6"

                />
              </div>
            </div>

            <div>
              <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#d77a61] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#d77a61] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d77a61]"
              >
                {wait == "wait" ? "Wait..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
            to="/signup"
            className="font-semibold text-[#d77a61] hover:text-[#d77a61]"
            >

              SignUp for Free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
