import { Admin } from "../../entities/admin/admin.entity";
import BcryptService from "../../utils/bcrypt.util";
import jwt from 'jsonwebtoken';
import { DotEnvConfig } from "../../config/dotenv.config";

class AdminAuthService {
  async AdminLogin(email: string, password: string) {
    const admin = await Admin.findOne({ where: { email }, select: ['password', 'id'] });
    if (!admin) throw new Error("Admin not found");

    const passwordMatch = await BcryptService.compare(password, admin.password);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: admin.id, email: admin.email }, DotEnvConfig.JWT_SECRET, { expiresIn: DotEnvConfig.JWT_EXPIRY })
    const refreshToken = jwt.sign({ id: admin.id, email: admin.email }, DotEnvConfig.JWT_REFRESH_SECRET, { expiresIn: DotEnvConfig.JWT_REFRESH_EXPIRY })

    return { token, refreshToken }
  }
}


export default new AdminAuthService();