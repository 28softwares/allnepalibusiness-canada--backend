import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  IsUrl,
} from "class-validator";

import { BusinessType } from "../../entities/business/Business.entity";

export class SocialHandlesDTO {
  @IsOptional()
  @IsUrl()
  facebook: string;

  @IsOptional()
  @IsUrl()
  instagram: string;

  @IsOptional()
  @IsUrl()
  twitter: string;

  @IsOptional()
  @IsUrl()
  linkedin: string;

  @IsOptional()
  @IsUrl()
  youtube: string;
}

export class UpdateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(BusinessType)
  type: BusinessType;

  @IsUUID()
  registrationDocument: string;

  @IsUUID()
  ownerIDDocument: string;

  @IsString()
  @IsNotEmpty()
  provinceTerritory: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsUrl()
  website: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsUUID()
  logo: string;

  @IsUUID()
  cover: string;

  @IsOptional()
  @Object(() => SocialHandlesDTO)
  socialHandles: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}
