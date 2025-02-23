import { Body, Controller, Post, Route, Tags } from "tsoa";
import userauthService from "../../services/auth/userauth.service";
import { RegisterUserDTO } from "../../dtos/user/registerUser.dto";

@Route("/auth")
  @Tags("User Auth")
export class UserAuthController extends Controller {
  @Post("/register")
  async register(@Body() user: RegisterUserDTO) {
    return await userauthService.register(user);
  }

  @Post("/login")
  async login(@Body() user: { email: string, password: string }) {
    return await userauthService.login(user.email, user.password);
  }


  @Post("/verify")
  async verifyAccount(@Body() user: { email: string, otp: number }) {
    const { email, otp } = user;
    return await userauthService.verifyOtp({ email, otp });
  }
}