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

<<<<<<< HEAD
  @Column({ type: "json", nullable: true })
  actionByAdmin: [
    { status: "REVIEW" | "APPROVED" | "REJECTED"; reason: string; date: Date }
  ];

  @Column({ type: "boolean", nullable: true })
  status: "ACTIVE" | "INACTIVE";
=======
  @OneToOne(() => Media, (media) => media.businessLogo)
  logo: Media;

  @OneToOne(() => Media, (media) => media.businessCover)
  coverImage: Media;

  @OneToOne(() => Media, (media) => media.businessRegistrationDocument)
  businessRegistrationDocument: string;
>>>>>>> main

  @OneToOne(() => User, (user) => user.business)
  owner: User;
}
