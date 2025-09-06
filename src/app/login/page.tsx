"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function loginpage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("LoggedIn", response);
      router.push("/profile");
    } catch (error: any) {
      console.log("LogIn failed");
      toast.error(error.message);
       setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    )
     {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
  {/* Heading */}
  <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
    {loading ? "Processing..." : "Log In"}
  </h1>

  <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
    Please enter your credentials to access your account.
  </p>

  {/* Form container */}
  <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
    
    {/* Email */}
    <label
      htmlFor="email"
      className="block text-gray-700 font-medium mb-1"
    >
      Email
    </label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition-all duration-200"
      id="email"
      type="email"
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="Enter email"
    />

    {/* Password */}
    <label
      htmlFor="password"
      className="block text-gray-700 font-medium mb-1"
    >
      Password
    </label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition-all duration-200"
      id="password"
      type="password"
      value={user.password}
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="Enter password"
    />

    {/* Login Button */}
    <button
      onClick={onLogin}
      className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
        disabledButton
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
      disabled={disabledButton}
    >
      {disabledButton ? "No Log In" : "Log In"}
    </button>

    {/* Link to signup */}
    <p className="text-center mt-6 text-sm text-gray-600">
      Don't have an account?{" "}
      <Link href="/signup" className="text-blue-500 hover:underline font-medium">
        Sign up here
      </Link>
    </p>
  </div>
</div>

  );
}
