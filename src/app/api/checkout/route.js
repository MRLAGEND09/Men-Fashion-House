import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, email } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "No items provided" }, { status: 400 });
    }

    // Build origin from headers
    const protocol =
      request.headers.get("x-forwarded-proto") ||
      (request.headers.get("referer")
        ? request.headers.get("referer").split("://")[0]
        : "http");
    const host = request.headers.get("host");
    const origin = `${protocol}://${host}`;

    // Convert items to Stripe's line_items format
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name || "Unnamed Product",
          images: item.img ? [item.img] : [],
        },
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_email: email,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
