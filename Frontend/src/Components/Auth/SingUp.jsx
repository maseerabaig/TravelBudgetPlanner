import React, { useState } from "react";
import Navbar from "../Home/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

function SingUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  // massage
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [wait, setWait] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setWait('wait')

    try {
      const response = await axios.post(
        "https://travelbudgettool.onrender.com/user/signup",
        formData
      );
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      setMsg("Account Created");

    } catch (error) {
      setMsg(error.response?.data?.msg || "Something went wrong!");
    }finally{
      setWait('')

    }
  };

  return (
    <>
      <Navbar />

      {/* msg div */}
      {msg !== "" && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h1 className="text-lg font-bold mb-4 px-20">{msg}</h1>
            {msg == "Account Created" ? (
              <Link to="/login">
                <button className="bg-[#d77a61] text-white px-4 py-2 rounded hover:bg-[#d77a61]">

                  Login Now
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setMsg("")}
                className="bg-[#d77a61] text-white px-4 py-2 rounded hover:bg-[#d77a61]"

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

            Create New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#d77a61] sm:text-sm/6"

                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#d77a61] sm:text-sm/6"

                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#d77a61] sm:text-sm/6"

                  value={formData.email}
                  onChange={handleChange}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#d77a61] sm:text-sm/6"

                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#d77a61] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#d77a61] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d77a61]"

              >
                {(wait == 'wait') ? 'Wait...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#d77a61] hover:text-[#d77a61]"  

            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SingUp;
