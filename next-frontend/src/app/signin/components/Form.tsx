"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsSignedIn } from "../../../state/isSignedIn/isSignedIn";
import { useRouter } from "next/navigation";
import { setUser } from "@/state/User/user";
import { userProfiles } from "@/userProfiles";

const Form = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const dispatch = useDispatch();
      const router = useRouter();
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setIsSignedIn());
        dispatch(setUser(userProfiles[0]))
        router.push("/");
      };
  return ( 
    <form className="space-y-6 " onClick={(e) => handleSubmit(e)}>
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
  )
}

export default Form