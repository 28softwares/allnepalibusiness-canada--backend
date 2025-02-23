import Stripe from 'stripe';
import { DotEnvConfig } from '../../config/dotenv.config';
import { User } from '../../entities/user/User.entity';
import { AppResponse } from '../../utils/appResponse.util';

const stripe = new Stripe(DotEnvConfig.STRIPE_SECRET_KEY);
class PaymentService {
  async createCheckoutSession(
    businessName: string,
    email: string,
  ) {
    const user = await User.findOne({ where: { email } });

    const stripeResponse = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: businessName,
            },
            unit_amount: 300,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DotEnvConfig.FRONTEND_BASE_URL}/success`,
      cancel_url: `${DotEnvConfig.FRONTEND_BASE_URL}/user-dashboard`,
      metadata: {
        email: email,
      },
    });
    return AppResponse.success(
      'Checkout session created successfully!',
      stripeResponse,
    );
  }

}
export default new PaymentService();