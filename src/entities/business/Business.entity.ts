import { Column, Entity, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { Media } from "../media/Media.entity";
import { User } from "../user/User.entity";

export enum BusinessCategory {
  INSURANCE = "INSURANCE",
  FINANCE = "FINANCE",
  HEALTHCARE = "HEALTHCARE",
  TECHNOLOGY = "TECHNOLOGY",
  RETAIL = "RETAIL",
  WHOLESALE = "WHOLESALE",
}

//owner id document type
export enum OwnerIdType {
  PASSPORT = "PASSPORT",
  DRIVERS_LICENSE = "DRIVERS_LICENSE",
  NATIONAL_ID = "NATIONAL_ID",
  OTHER = "OTHER",
}


export enum VisibilityStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Entity()
export class Business extends CommonEntity {
  @Column()
  businessName: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: BusinessCategory })
  category: BusinessCategory;

  @Column()
  website: string;

  @Column({
    type: "json",
  })
  visibility: {
    status: VisibilityStatus;
    remarks: string;
  }[]

  @Column({
    type: "jsonb",
  })
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  }

  @Column({
    type: "jsonb",
  })
  businessContactInformation: {
    phone: string;
    email: string;
  };

  @Column({ nullable: true, type: "jsonb" })
  socialHandles: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };

  @OneToOne(() => Media, (media) => media.businessLogo)
  logo: Media;

  @OneToOne(() => Media, (media) => media.businessCover)
  coverImage: Media;

  @OneToOne(() => Media, (media) => media.businessRegistrationDocument)
  businessRegistrationDocument: Media;

  @OneToOne(() => User, (user) => user.business)
  owner: User;
}
