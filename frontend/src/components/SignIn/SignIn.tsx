import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Utilities/Background";
import { useDispatch } from "react-redux";
import { setIsSignedIn } from "../../state/isSignedIn/isSignedIn";

const SignIn = () => {
  //Sign page for users
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsSignedIn());
    navigate("/")
  };
  return (
      <Background>
        <div className="min-h-full flex flex-col items-center justify-center pt-24 lg:pt-24">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div className="p-4">
              <h1 className="text-4xl  font-extrabold lg:leading-[50px] ">
                <span className="text-secondary">Seamless Login</span> for
                Exclusive Access
              </h1>
              <p className="text-sm mt-6 ">
                Immerse yourself in a hassle-free login journey with our
                intuitively designed login form. Effortlessly access your
                account.
              </p>
              <p className="text-sm mt-6 ">
                Don't have an account{" "}
                <a
                  href="/register"
                  className=" font-semibold underline ml-1 text-secondary"
                >
                  Register here
                </a>
              </p>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="bg-white sm:shadow-lg sm:rounded-xl px-6 py-8 space-y-6 max-w-md mx-auto md:ml-auto w-full"
            >
              <h2 className="text-3xl font-extrabold mb-12">Sign in</h2>

              <div>
                <label className="font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="font-bold" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                  placeholder="Password"
                />
              </div>
              <div className="text-sm text-right">
                <a
                  href="."
                  className="text-secondary font-semibold hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </Background>
  );
};

export default SignIn;
