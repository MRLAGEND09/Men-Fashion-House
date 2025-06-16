"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  allRemove,
  decrementQuantity,
  incressQuantity,
  singleDelete,
} from "./redux/shoppingSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const selector = useSelector((state) => state.name.cart);
  const userInfo = useSelector((state) => state.name.userInfo);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // State to manage totals
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableTotal, setPayableTotal] = useState(0);
  useEffect(() => {
    let priceSum = 0;
    let discountSum = 0;

    selector.map((product) => {
      const subtotal = product.oldprice * product.quantity;
      const discount = (product.oldprice - product.price) * product.quantity;

      priceSum += subtotal;
      discountSum += discount;
    });

    setTotalPrice(priceSum);
    setTotalDiscount(discountSum);
    setPayableTotal(priceSum - discountSum);
  }, [selector]);

  // payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const handleCheakOut = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        item: selector,
        email: session.user.email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      stripe?.redirectToCheckout({ sessionId: data.id });
    } else {
      throw new Error("Failed to create Stripe Payment");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto mt-10">
        <h1 className="text-xl font-semibold text-black">
          Your Products Shopping Cart
        </h1>
        <table className="min-w-full bg-[#ECEEF0] border mt-5">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Remove</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Old Price</th>
              <th className="px-4 py-2 border">Discount</th>
              <th className="px-4 py-2 border">Unit Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {selector.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="px-4 py-2 border border-white">
                  <button
                    onClick={() =>
                      dispatch(
                        singleDelete(product.id),
                        toast.success("Product deleted successfully")
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoMdClose size={20} />
                  </button>
                </td>
                <td className="px-4 py-2 border border-white">
                  <Image
                    width={200}
                    height={200}
                    src={product.img}
                    alt={product.name}
                    className="w-20 mx-auto h-20 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border border-white">
                  {product.name.slice(0, 10)}
                </td>
                <td className="px-4 py-2 border border-white">
                  ${product.oldprice.toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-white">
                  ${(product.oldprice - product.price) * product.quantity}
                </td>
                <td className="px-4 py-2 border border-white">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-white">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => dispatch(decrementQuantity(product.id))}
                      className="px-2 py-1 text-white bg-gray-500 hover:bg-gray-700 rounded"
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          incressQuantity(product.id),
                          toast.success("Increment successful")
                        )
                      }
                      className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-700 rounded"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <button
          onClick={() =>
            dispatch(
              allRemove(),
              toast.success("All products deleted successfully")
            )
          }
          className="bg-transparent border w-full border-gray-500 text-black rounded-lg px-6 py-1.5 hover:bg-red-500 hover:text-black duration-300 my-2"
        >
          Delete All
        </button>
      </div>

      <div className="px-24">
        <h2 className="text-2xl font-medium text-gray-900 mt-3">
          Order Summary
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xl text-gray-600">Total Price</p>
            <p className="text-xl font-medium text-gray-900">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-base font-medium text-gray-900">
              Total Discount
            </p>
            <p className="font-medium text-gray-900 text-xl">
              ${totalDiscount.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-base font-medium text-gray-900">Payable Total</p>
            <p className="text-2xl font-medium text-black">
              ${payableTotal.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            {userInfo ? (
              <button
                onClick={handleCheakOut}
                className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
              >
                Proceed to Payment
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="w-full max-w-xs animate-bounce px-6 py-3 bg-red-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
              >
                Please Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
