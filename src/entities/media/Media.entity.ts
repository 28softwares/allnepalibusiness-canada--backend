import { AfterLoad, Column, Entity, OneToOne } from "typeorm";
import { CommonSchema } from "../common/CommonSchema.entity";
import { Business } from "../business/Business.entity";

export enum MediaType {
  BUSINESS_LOGO = "BUSINESS_LOGO",
  BUSINESS_COVER = "BUSINESS_COVER",
  BUSINESS_REGISTRATION = "BUSINESS_REGISTRATION",
  OWNER_IDENTIFICATION_DOCUMENT = "OWNER_IDENTIFICATION_DOCUMENT",
}

@Entity()
export class Media extends CommonSchema {
  @Column()
  mimeType: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: MediaType })
  type: MediaType;

  @OneToOne(() => Business, (business) => business.registrationDocument)
  businessRegistration: string;

  @OneToOne(() => Business, (business) => business)
  businessLogo: string;

  @OneToOne(() => Business, (business) => business.ownerIdDocument)
  ownerId: string;

  @OneToOne(() => Business, (business) => business.cover)
  businessCover: string;

  @AfterLoad()
  updateMediaPath() {
    this.name = `http://localhost:4000/public/uploads/${this.name}`;
  }
}
