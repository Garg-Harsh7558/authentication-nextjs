"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      VerifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-center">
  <h1 className="text-3xl font-bold text-blue-600 mb-4">Verify Email</h1>

  <h2 className="text-md text-gray-700 mb-6">
    {token ? `${token}` : "No token provided"}
  </h2>

  {verified && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-4">
      <h2 className="text-lg font-semibold">Email Verified!</h2>
      <Link
        href="/login"
        className="mt-2 inline-block text-blue-600 underline hover:text-blue-800"
      >
        Go to Login
      </Link>
    </div>
  )}

  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-4">
      <h2 className="text-lg font-semibold">Verification Failed</h2>
     
    </div>
  )}
</div>

  );
}
