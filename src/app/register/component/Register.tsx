import React from "react";
import Form from "./Form";

const Register = () => {
  
return (
    <div className="min-h-screen pt-28 lg:pt-6 p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Register Now, Go Viral Tomorrow
            </h2>
            <p className="text-gray-600">
              Please fill out all the fields to complete your registration.
            </p>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Register;
