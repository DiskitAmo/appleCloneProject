import type { NextApiRequest, NextApiResponse } from "next";
//import logger from "next-auth/utils/logger";
import Stripe from "stripe";
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sessionId = req.query.session_id as string;

    const session = await stripe.checkout.sessions.listLineItems(sessionId);
    res.status(200).send({
      session,
    });
  } catch (e) {
    res.status(500).send({ success: false });
    console.log(e, "error");
  }
}
