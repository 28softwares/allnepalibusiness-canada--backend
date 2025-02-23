import { Body, Controller, Post, Route, Tags } from "tsoa";
import paymentService from "../../services/payment/payment.service";

@Route("/payment")
@Tags("Payment")
export class PaymentController extends Controller {
  @Post("/checkout")
  async createCheckoutSession(@Body() body: { businessName: string, email: string }) {
    const { businessName, email } = body;
    return await paymentService.createCheckoutSession(businessName, email);
  }

}