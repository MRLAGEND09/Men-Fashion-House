import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const reqBody = await request.json();
    const { email, item } = reqBody;
    console.log("item", item);

    const extractingItems = item.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.img],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${process.env.NEXT_AUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_AUTH_URL}/cancel`,
      metadata: {
        email,
      },
    });

    return NextResponse.json({
      success: true,
      message: "server connected",
      id: session.id,
    });
  } catch (error) {
    console.log("err", error);
    return NextResponse.json(
      { success: false, message: "Checkout failed", error: error.message },
      { status: 500 }
    );
  }
};