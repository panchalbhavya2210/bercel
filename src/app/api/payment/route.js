// app/api/payment/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
// Reading the stripe key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Processing the payment
export async function POST(request) {
  const { items, totalAmt } = await request.json();
  console.log(items[0].product.name);

  if (!items || !totalAmt) {
    // returning error if items or total amout is invalid
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
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      success_url: "https://homelyeq.vercel.app/success",
      cancel_url: "https://homelyeq.vercel.app/cancel",
    });

    // returning the response of url to redirect client to stripe payment page
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

///hello
