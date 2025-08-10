"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  allRemove,
  decrementQuantity,
  incressQuantity, // Keep this spelling if your redux slice uses it
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Products Shopping Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border border-gray-300 text-left">Remove</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Image</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Title</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Old Price</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Discount</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Unit Price</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Quantity</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr key={product.id} className="text-center even:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-left">
                  <button
                    aria-label="Remove product"
                    onClick={() => {
                      dispatch(singleDelete(product.id));
                      toast.success("Product deleted successfully");
                    }}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <IoMdClose size={20} />
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-300 text-left">
                  <Image
                    width={200}
                    height={200}
                    src={product.img}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-left">{product.name.slice(0, 15)}</td>
                <td className="px-4 py-2 border border-gray-300 text-left">${product.oldprice.toFixed(2)}</td>
                <td className="px-4 py-2 border border-gray-300 text-left">
                  ${((product.oldprice - product.price) * product.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-left">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2 border border-gray-300 text-left">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      aria-label="Decrease quantity"
                      disabled={product.quantity <= 1}
                      onClick={() => dispatch(decrementQuantity(product.id))}
                      className={`px-2 py-1 rounded-md text-white ${
                        product.quantity <= 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gray-600 hover:bg-gray-700"
                      } transition duration-300`}
                    >
                      <FaMinus />
                    </button>
                    <span className="w-6 text-center font-medium">{product.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => {
                        dispatch(incressQuantity(product.id));
                        toast.success("Quantity increased");
                      }}
                      className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 border border-gray-300 text-left">
                  ${(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 w-full max-w-md mx-auto">
        <button
          aria-label="Delete all products"
          onClick={() => {
            dispatch(allRemove());
            toast.success("All products deleted successfully");
          }}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Delete All
        </button>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Order Summary</h2>

        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Total Price</span>
          <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-700">Total Discount</span>
          <span className="font-semibold text-gray-900">${totalDiscount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-3 border-b border-gray-300">
          <span className="text-lg font-bold text-black">Payable Total</span>
          <span className="text-lg font-bold text-black">${payableTotal.toFixed(2)}</span>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="cursor-pointer"
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
                className="cursor-pointer"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {userInfo ? (
            <button
              aria-label="Proceed to Payment"
              disabled={loading}
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          ) : (
            <button
              aria-label="Please Login"
              onClick={() => signIn()}
              className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 shadow-md animate-bounce"
            >
              Please Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
