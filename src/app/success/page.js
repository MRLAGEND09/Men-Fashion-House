"use client";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { allRemove } from "../../components/redux/shoppingSlice";

const SuccesPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();

  // Redirect if sessionId is missing
  if (!sessionId) redirect("/");

<<<<<<< HEAD
  useEffect(() => { 
=======
  useEffect(() => {
>>>>>>> 1bad81faf37582675c535194b8cea75b52b2fa0a
    if (sessionId) {
      dispatch(allRemove());
    }
  }, [dispatch, sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center transform transition duration-500 hover:scale-105">
        {/* Success Icon */}
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

        {/* Success Message */}
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your purchase! You can now explore our store.
        </p>

        {/* Go to Shopping Button */}
        <Link href="/">
          <p className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300">
            Go to Shopping
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SuccesPage;
