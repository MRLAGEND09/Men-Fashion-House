
import { NextResponse } from "next/server";
import Stripe from "stripe";


import Cart from "../../components/Cart";

export default function CartPage() {
  return (
    <div>
      <Cart />
    </div>
  );
}


