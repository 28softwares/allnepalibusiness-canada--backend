import {
  IsEmail,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from "class-validator";

import { BusinessCategory } from "../../entities/business/Business.entity";
import { User } from "../../entities/user/User.entity";

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

<<<<<<< HEAD
export class UpdateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
=======
>>>>>>> main

export class ContactInformationDTO {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}


<<<<<<< HEAD
  @IsUUID()
  registrationDocument: string;

  @IsUUID()
  ownerIDDocument: string;

  @IsString()
  @IsNotEmpty()
  provinceTerritory: string;
=======
export class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string;
>>>>>>> main

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
  name: string;

  @IsOptional()
  @IsString()
  description: string;

<<<<<<< HEAD
  @IsUUID()
  logo: string;

  @IsUUID()
  cover: string;
=======
  @IsEnum(BusinessCategory)
  category: BusinessCategory;

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
  registrationDocumentId: string;

  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  coverImage: string;

  @IsNotEmpty()
  owner: User;
>>>>>>> main

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
