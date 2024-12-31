import { Column, Entity, OneToOne } from "typeorm";
import { CommonSchema } from "../common/CommonSchema.entity";
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

@Entity()
export class Business extends CommonSchema {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: "enum", enum: BusinessType })
  type: BusinessType;

  @OneToOne(() => Media, (media) => media.businessRegistration)
  registrationDocument: Media;

  @OneToOne(() => Media, (media) => media.ownerId)
  ownerIdDocument: Media;

  @Column()
  provinceTerritory: string;

  @Column()
  city: string;

  @Column()
  postalcode: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  description: string; // business description

  @OneToOne(() => Media, (media) => media.businessLogo)
  logo: Media;

  @OneToOne(() => Media, (media) => media.businessCover)
  cover: Media;

  @Column({ nullable: true, type: "json" })
  socialHandles: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };

  @OneToOne(() => User, (user) => user.business)
  owner: User;
}
