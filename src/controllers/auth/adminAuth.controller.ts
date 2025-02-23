import { Body, Controller, Post, Route, Tags } from "tsoa";
import adminAuthService from "../../services/auth/adminAuth.service";

@Route("/su")
@Tags("Admin Auth")
export class AdminAuthController extends Controller {
  @Post("/login")
  async adminLogin(@Body() admin: { email: string, password: string }) {
    return await adminAuthService.AdminLogin(admin.email, admin.password);
  }
}