"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  allRemove,
  decrementQuantity,
  incressQuantity, // If your slice uses 'incressQuantity', keep as is. Otherwise, rename to 'increaseQuantity'.
  singleDelete,
} from "./redux/shoppingSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const cartItems = useSelector((state) => state.name.cart || []);
  const userInfo = useSelector((state) => state.name.userInfo);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableTotal, setPayableTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let priceSum = 0;
    let discountSum = 0;

    cartItems.forEach((product) => {
      const subtotal = product.oldprice * product.quantity;
      const discount = (product.oldprice - product.price) * product.quantity;
      priceSum += subtotal;
      discountSum += discount;
    });

    setTotalPrice(priceSum);
    setTotalDiscount(discountSum);
    setPayableTotal(priceSum - discountSum);
  }, [cartItems]);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const handleCheckout = async () => {
    if (!session?.user?.email) {
      toast.error("You must be signed in to proceed with payment");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (paymentMethod === "cash") {
      try {
        setLoading(true);
        const res = await fetch("/api/cash-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            email: session.user.email,
            total: payableTotal,
            paymentMethod: "cash",
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          toast.error(err.message || "Failed to place cash order");
          setLoading(false);
          return;
        }

        toast.success("Cash on Delivery order placed successfully");
        dispatch(allRemove());
        setLoading(false);
        window.location.href = "/";
      } catch (err) {
        console.error(err);
        toast.error("Failed to place cash order");
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          email: session.user.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to create Stripe payment");
        setLoading(false);
        return;
      }

      if (!stripe) {
        toast.error("Stripe did not load");
        setLoading(false);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) toast.error(error.message);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during checkout");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto mt-10">
        <h1 className="text-xl font-semibold text-black">Your Products Shopping Cart</h1>
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
            {cartItems.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="px-4 py-2 border border-white">
                  <button
                    aria-label="Remove product"
                    onClick={() => {
                      dispatch(singleDelete(product.id));
                      toast.success("Product deleted successfully");
                    }}
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
                <td className="px-4 py-2 border border-white">{product.name.slice(0, 10)}</td>
                <td className="px-4 py-2 border border-white">${product.oldprice.toFixed(2)}</td>
                <td className="px-4 py-2 border border-white">
                  ${((product.oldprice - product.price) * product.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-white">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2 border border-white">
                  <div className="flex items-center justify-center">
                    <button
                      aria-label="Decrease quantity"
                      disabled={product.quantity <= 1}
                      onClick={() => dispatch(decrementQuantity(product.id))}
                      className={`px-2 py-1 text-white rounded ${product.quantity <= 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-500 hover:bg-gray-700"
                      }`}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => {
                        dispatch(incressQuantity(product.id));
                        toast.success("Increment successful");
                      }}
                      className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-700 rounded"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 border">${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <button
          aria-label="Delete all products"
          onClick={() => {
            dispatch(allRemove());
            toast.success("All products deleted successfully");
          }}
          className="bg-transparent border w-full border-gray-500 text-black rounded-lg px-6 py-1.5 hover:bg-red-500 hover:text-black duration-300 my-2"
        >
          Delete All
        </button>
      </div>

      <div className="px-24">
        <h2 className="text-2xl font-medium text-gray-900 mt-3">Order Summary</h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xl text-gray-600">Total Price</p>
            <p className="text-xl font-medium text-gray-900">${totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-base font-medium text-gray-900">Total Discount</p>
            <p className="font-medium text-gray-900 text-xl">${totalDiscount.toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-base font-medium text-gray-900">Payable Total</p>
            <p className="text-2xl font-medium text-black">${payableTotal.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span>Card Payment</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            {userInfo ? (
              <button
                aria-label="Proceed to Payment"
                disabled={loading}
                onClick={handleCheckout}
                className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            ) : (
              <button
                aria-label="Please Login"
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