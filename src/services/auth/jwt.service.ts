import { DotEnvConfig } from "../../config/dotenv.config";
import { User } from "../../entities/user/User.entity";
import jwt from "jsonwebtoken";
import userService from "../user/user.service";

class JWTService {
  async assignAccessToken(userId: string) {
    const user = await userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    const token = jwt.sign({ id: user.id, email: user.email, fullName: user.fullName }, DotEnvConfig.JWT_SECRET, { expiresIn: DotEnvConfig.JWT_EXPIRY })
    return token;
  }

  async assignRefreshToken(userId: string) {
    const user = await userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    const token = jwt.sign({ id: user.id, email: user.email, fullName: user.fullName }, DotEnvConfig.JWT_REFRESH_SECRET, { expiresIn: DotEnvConfig.JWT_REFRESH_EXPIRY })
    return token;
  }
}
export default new JWTService();