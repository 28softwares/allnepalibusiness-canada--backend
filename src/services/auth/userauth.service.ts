import { DotEnvConfig } from "../../config/dotenv.config";
import { RegisterUserDTO } from "../../dtos/user/registerUser.dto";
import { Media } from "../../entities/media/Media.entity";
import { User } from "../../entities/user/User.entity";
import { AppError } from "../../utils/appError.util";
import { AppResponse } from "../../utils/appResponse.util";
import BcryptService from "../../utils/bcrypt.util";
import jwt from "jsonwebtoken"

class UserAuthService {
  async register(user: RegisterUserDTO) {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) throw AppError.conflict("User already exists");

    try {
      const newUser = new User();
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.password = user.password;

      const verificationDocument = await Media.findOne({
        where: {
          userVerificationImage: user.verificationDocument,
        }
      })

      if (!verificationDocument) throw AppError.notFound("Verification document not found");
      newUser.verificationDocumentImage = verificationDocument;

      await newUser.save();
      return AppResponse.success("User registration successful", { username: newUser.username, email: newUser.email })
    } catch (e) {
      console.error(e);
      throw new Error;
    }
  }



  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email }, select: ['password', 'id', 'email', 'username'] });
    if (!user) throw AppError.notFound("User not found");

    const passwordMatch = await BcryptService.compare(password, user.password);
    if (!passwordMatch) throw AppError.unAuthorized("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, DotEnvConfig.JWT_SECRET, { expiresIn: DotEnvConfig.JWT_EXPIRY })
    return AppResponse.success("User login successful", { token: token })
  }
}

export default new UserAuthService();