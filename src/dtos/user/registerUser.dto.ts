import { IsEmail,  IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}