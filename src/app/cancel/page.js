import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-200 via-yellow-200 to-pink-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center transform transition duration-500 hover:scale-105">
        {/* Cancel Icon */}
        <FaTimesCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />

        {/* Cancel Message */}
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          Payment Cancelled!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Unfortunately, your payment was not completed. Please try again.
        </p>

        {/* Go to Shopping Button */}
        <Link href="/">
          <p className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300">
            Return to Shopping
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
