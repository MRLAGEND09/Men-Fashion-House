import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items, email } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No items in cart" }, { status: 400 });
    }

    const protocol = request.headers.get("x-forwarded-proto") ||
      (request.headers.get("referer") ? request.headers.get("referer").split("://")[0] : null) ||
      "http";
    const host = request.headers.get("host");
    const origin = `${protocol}://${host}`;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.img ? [item.img] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_email: email,
    });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
}