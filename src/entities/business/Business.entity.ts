import { Column, Entity, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { Media } from "../media/Media.entity";
import { User } from "../user/User.entity";

export enum BusinessType {
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

@Entity()
export class Business extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: "enum", enum: BusinessType })
  type: BusinessType;

  @OneToOne(() => Media, (media) => media.businessRegistration)
  registrationDocument: Media;

  // @OneToOne(() => Media, (media) => media.ownerId)
  ownerIdDocument: string;

  @Column()
  provinceTerritory: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  description: string;

  @OneToOne(() => Media, (media) => media.businessLogo)
  logo: Media;

  @OneToOne(() => Media, (media) => media.businessCover)
  cover: Media;

  @Column({ nullable: true, type: "jsonb" })
  socialHandles: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };

  @OneToOne(() => User, (user) => user.business)
  owner: User;
}
