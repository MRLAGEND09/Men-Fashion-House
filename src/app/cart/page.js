
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


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { email, item } = await request.json();

    if (!item || !Array.isArray(item) || item.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items provided" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const extractingItems = item.map((p) => ({
      quantity: p.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(Number(p.price) * 100),
        product_data: {
          name: p.name,
          description: p.description || "",
          images: [
            p.img
              ? p.img.startsWith("http")
                ? p.img
                : `${baseUrl}${p.img}`
              : "",
          ],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: extractingItems,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: { email },
    });

    return NextResponse.json({
      success: true,
      message: "Checkout session created",
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json(
      { success: false, message: "Checkout failed", error: error.message },
      { status: 500 }
    );
  }
}
