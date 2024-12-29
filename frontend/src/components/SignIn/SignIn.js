import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  //Sign page for users
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }))
  }

  const navigate = useNavigate();
  return (
    <div className="pt-20 font-[sans-serif] bg-gradient-to-r from-blue-800 to-skyblue text-gray-800">
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-white">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-6 text-white">
              Don't have an account{" "}
              <a
                href="/register"
                className="text-white font-semibold underline ml-1"
              >
                Register here
              </a>
            </p>
          </div>

          <form className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full">
            <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

            <div>
              <input
                name="email"
                type="email"
                autocomplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autocomplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Password"
              />
            </div>
            <div className="text-sm text-right">
              <a
                href="."
                className="text-blue-600 font-semibold hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
