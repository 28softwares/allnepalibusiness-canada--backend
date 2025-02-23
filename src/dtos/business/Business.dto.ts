import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from "class-validator";

import { VisibilityStatus } from "../../entities/business/Business.entity";

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

export class ContactInformationDTO {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}

export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  postalCode: string;
}
export class CreateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsUrl()
  website: string;

  @IsNotEmpty()
  @IsJSON()
  @Object(() => ContactInformationDTO)
  businessContactInformation: {
    phone: string;
    email: string;
  };

  @IsJSON()
  @IsNotEmpty()
  @Object(() => AddressDTO)
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };

  @IsString()
  @IsNotEmpty()
  businessRegistrationDocument: string;

  @IsString()
  @IsNotEmpty()
  ownerVerificationDocument: string;

  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  coverImage: string;

  @IsOptional()
  visibility?: {
    status?: VisibilityStatus,
    remarks?: string
  }

  // @IsNotEmpty()
  // owner: User;

  @IsOptional()
  @Object(() => SocialHandlesDTO)
  socialHandles?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };

  @IsNotEmpty()
  @IsUUID()
  ownerId: string;
}
