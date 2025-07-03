import React from "react";
import Background from "./Background";
import Form from "./Form";

const SignIn = () => {
  //Sign page for users

  return (
    <Background>
      <div className="min-h-full flex flex-col items-center justify-center pt-28 lg:pt-8">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="p-4">
            <h1 className="text-4xl  font-extrabold lg:leading-[50px] ">
              <span className="text-secondary">Access Your Content Hub</span> -
              Distribute Clips
            </h1>
            <p className="text-sm mt-6 ">
              Join thousands of creators and clippers in the premier
              marketplace for video clips. Sign in to discover premium content,
              manage your portfolio, and grow your audience.
            </p>
          </div>

          <div className="bg-white sm:shadow-lg sm:rounded-xl px-6 py-8 max-w-md mx-auto md:ml-auto w-full">
            <h2 className="text-3xl font-extrabold mb-12">Welcome Back</h2>
            <Form />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default SignIn;
