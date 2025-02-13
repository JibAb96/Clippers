import React from "react";
import Background from "./Background";
import Form from "./Form";


const Login = () => {
  //Sign page for users

  return (
    <Background>
      <div className="min-h-full flex flex-col items-center justify-center pt-28 lg:pt-8">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="p-4">
            <h1 className="text-4xl  font-extrabold lg:leading-[50px] ">
              <span className="text-secondary">Seamless Login</span> for
              Exclusive Access
            </h1>
            <p className="text-sm mt-6 ">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
          </div>

          <div
            className="bg-white sm:shadow-lg sm:rounded-xl px-6 py-8 max-w-md mx-auto md:ml-auto w-full"
          >
            <h2 className="text-3xl font-extrabold mb-12">Sign in</h2>
            <Form/>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Login;
