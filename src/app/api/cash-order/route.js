import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { items, email } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No items in cart" }, { status: 400 });
    }

    // Here you would save the order to your database and mark it as "Cash on Delivery"
    // Example: await saveOrderToDB({ items, email, paymentMethod: "cash" });

    // Simulate order ID for response (replace with real DB ID if available)
    const orderId = Math.random().toString(36).substring(2, 10);

    return NextResponse.json(
      { id: orderId, message: "Cash order placed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Cash order error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}