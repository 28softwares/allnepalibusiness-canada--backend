import { DotEnvConfig } from "../../config/dotenv.config";
import { RegisterUserDTO } from "../../dtos/user/registerUser.dto";
import { Media } from "../../entities/media/Media.entity";
import { User } from "../../entities/user/User.entity";
import { AppError } from "../../utils/appError.util";
import { AppResponse } from "../../utils/appResponse.util";
import BcryptService from "../../utils/bcrypt.util";
import jwt from "jsonwebtoken"
import otpService from "./otp.service";
import { OTP } from "../../entities/otp/otp.entity";
import emailUtil, { MailType } from "../../utils/email.util";

class UserAuthService {

  async register(user: RegisterUserDTO) {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) throw AppError.conflict("User already exists");

    try {
      const newUser = new User();
      newUser.fullName = user.fullName;
      newUser.email = user.email;
      newUser.password = user.password;
      await newUser.save();

      const otp = await otpService.generateOtp();
      const otpEntity = new OTP();
      otpEntity.user = newUser;
      otpEntity.otp = otp;
      await otpEntity.save();


      await emailUtil.sendMail(newUser.email, MailType.NEW_OTP, otp, `Welcome to Nepali Rental Community in Canada, your OTP is ${otp}`);

      return AppResponse.success("User registration successful. OTP for verification has been sent to your email.", { username: newUser.fullName, email: newUser.email })

    } catch (e) {
      console.error(e);
      throw new Error;
    }
  }



  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email }, select: ['password', 'id', 'email', 'fullName'] });
    if (!user) throw AppError.notFound("User not found");

    const passwordMatch = await BcryptService.compare(password, user.password);
    if (!passwordMatch) throw AppError.unAuthorized("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email, fullName: user.fullName }, DotEnvConfig.JWT_SECRET, { expiresIn: DotEnvConfig.JWT_EXPIRY })
    return AppResponse.success("User login successful", { token: token })
  }


  async verifyOtp({ otp }: { otp: number }) {


  }
}

export default new UserAuthService();