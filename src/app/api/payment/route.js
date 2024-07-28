// app/api/payment/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { items, totalAmt } = await request.json();
  console.log(items[0].product.name);

  if (!items || !totalAmt) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: items[0].product.name,
          images: [items[0].product.image],
        },
        unit_amount: 50 * 100,
      },
      quantity: 3,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return new Response(
      JSON.stringify({
        url: session.url,
        paymentId: session.payment_intent,
        sessionData: session,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing payment", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
