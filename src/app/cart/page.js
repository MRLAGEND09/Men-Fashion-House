"use client";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import Cart from "../../components/Cart";
import Container from "../../components/Container";
import Link from "next/link";

const CartPage = () => {
  const selector = useSelector((state) => state.name.cart);

  return (
    <Container>
      {selector.length ? (
        <div>
          <Cart />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Product Not Available
          </h1>
          <p className="text-gray-600 mb-6">
            The product youre looking for is no longer available or does not
            exist.
          </p>

          <Link href={"/"}>
            <button className="flex items-center px-6 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 rounded">
              <FaHome className="mr-2" /> Go to Home Page
            </button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
