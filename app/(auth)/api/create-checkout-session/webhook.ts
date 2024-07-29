// File: /pages/api/stripe-webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      req.on("end", () => resolve(Buffer.concat(chunks)));
      req.on("error", (err) => reject(err));
    });

    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      if (!sig || !webhookSecret) {
        throw new Error("Missing signature or webhook secret");
      }

      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );

      // Handle event type
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        // Fulfill the purchase (e.g., save order in database)
        console.log(`Payment succeeded for session ${session.id}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Error processing webhook", err);
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
