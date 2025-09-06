"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function signuppage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signedUp", response);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 tracking-wide mb-6">
        {loading ? "Processing..." : "Signup"}
      </h1>

      <hr className="w-1/2 border-t-2 border-cyan-400 mb-8" />

      {/* Form container */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Username */}
        <label
          htmlFor="username"
          className="block text-gray-700 font-semibold mb-2"
        >
          Username
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
        />

        {/* Email */}
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="block text-gray-700 font-semibold mb-2"
        >
          Password
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
        />

        {/* Signup button */}
        <button
          onClick={onSignUp}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            disabledButton
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={disabledButton}
        >
          {disabledButton ? "No Signup" : "Signup"}
        </button>

        {/* Link to login */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Visit login page
          </Link>
        </p>
      </div>
    </div>
  );
}
