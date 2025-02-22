import { DotEnvConfig } from "../../config/dotenv.config";
import { RegisterUserDTO } from "../../dtos/user/registerUser.dto";
import { User } from "../../entities/user/User.entity";
import { AppError } from "../../utils/appError.util";
import { AppResponse } from "../../utils/appResponse.util";
import BcryptService from "../../utils/bcrypt.util";
import otpService from "./otp.service";
import { OTP } from "../../entities/otp/otp.entity";
import emailUtil, { MailType } from "../../utils/email.util";
import jwtService from "./jwt.service";
import AppDataSource from "../../config/database.config";
import exp from "constants";

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
    const user = await User.findOne({ where: { email }, select: ['password', 'email', 'id', 'isVerified'] });
    if (!user) throw AppError.notFound("User not found");

    const passwordMatch = await BcryptService.compare(password, user.password);
    if (!passwordMatch) throw AppError.unAuthorized("Invalid credentials");

    if (!user.isVerified) {
      let dbOtp = await OTP.findOne({
        where: {
          user: { id: user.id },
        }
      });

      let otp = dbOtp?.otp || await otpService.generateOtp();

      if (!dbOtp) {
        dbOtp = new OTP();
        dbOtp.user = user;
        dbOtp.otp = otp;
        dbOtp.exp = new Date(Date.now() + 1000 * 60 * 2);
        await dbOtp.save();
      } else if (dbOtp.exp < new Date()) {
        dbOtp.otp = otp;  //assign same old otp but increase the expiry
        dbOtp.exp = new Date(Date.now() + 1000 * 60 * 2);
        await dbOtp.save();
      }

      await emailUtil.sendMail(user.email, MailType.NEW_OTP, otp, `Verify your email to continue, your OTP is ${otp}`);
      return AppResponse.success("Please verify your email to continue. OTP sent to your email", {
        status: "OTP_NOT_VERIFIED",
      });
    }
    const token = await jwtService.assignAccessToken(user.id);
    const refreshToken = await jwtService.assignRefreshToken(user.id);

    return AppResponse.success("User login successful", { token: token, refreshToken: refreshToken })
  }

  async verifyOtp({ email, otp }: { email: string, otp: number }) {
    const user = await User.findOne({ where: { email }, select: ['otp', 'isVerified', 'id'] });
    if (!user) throw AppError.notFound("User not found");

    if (user.isVerified) throw AppError.conflict("User is already verified!");

    const dbOtp = await OTP.findOne({
      where: {
        user: { id: user.id },
      }
    });

    if (!dbOtp) throw AppError.notFound("OTP not found");

    if (dbOtp.otp !== otp) throw AppError.unAuthorized("Invalid OTP");

    if (dbOtp.exp < new Date()) throw AppError.unAuthorized("OTP expired");

    user.isVerified = true;
    await user.save();

    const token = await jwtService.assignAccessToken(user.id);
    const refreshToken = await jwtService.assignRefreshToken(user.id);

    return AppResponse.success("OTP verified successfully", { token: token, refreshToken: refreshToken });
  }
}

export default new UserAuthService();