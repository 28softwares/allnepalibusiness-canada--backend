import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { VerificationDocumentType } from "../../constants/appConstants";

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  verificationDocument: string;
}