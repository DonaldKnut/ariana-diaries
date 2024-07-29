// File: /app/(auth)/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Using getToken instead of getSession
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

// Named export for the POST method
export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { items, email } = await req.json();

    const transformedItems = items.map((item: any) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.img],
        },
      },
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      customer_email: email,
      metadata: {
        email,
      },
    });

    return NextResponse.json({ id: stripeSession.id });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
