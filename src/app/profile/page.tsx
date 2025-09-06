"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.post('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.post('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
  {/* Page Heading */}
  <h1 className="text-4xl font-bold text-blue-600 mb-4">Profile</h1>

  <p className="text-gray-600 text-lg mb-6">Welcome to your profile page</p>

  {/* User ID or Link */}
  <div className="mb-6">
    <h2 className="p-2 rounded-lg bg-green-500 text-white text-sm sm:text-base">
      {data === 'nothing' ? "No user data found" : (
        <Link href={`/profile/${data}`} className="hover:underline">
          {data}
        </Link>
      )}
    </h2>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4">
    <button
      onClick={logout}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
    >
      Logout
    </button>

    <button
      onClick={getUserDetails}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
    >
      Get User Details
    </button>
  </div>
</div>

    )
}