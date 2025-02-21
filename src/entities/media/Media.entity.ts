import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { Business } from "../business/Business.entity";
import { MediaType } from "../../constants/appConstants";
import { DotEnvConfig } from "../../config/dotenv.config";

@Entity()
export class Media extends CommonEntity {
  @Column()
  mimeType: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: MediaType })
  type: MediaType;

  @OneToOne(() => Business, (business) => business.businessRegistrationDocument)
  @JoinColumn()
  businessRegistrationDocument: Business;

  @OneToOne(() => Business, (business) => business)
  @JoinColumn()
  businessLogo: Business;

  @OneToOne(() => Business, (business) => business.coverImage)
  @JoinColumn()
  businessCover: Business;

  @OneToOne(() => Business, (business) => business.ownerVerificationDocument)
  @JoinColumn()
  ownerVerificationDocument: Business;

  @AfterLoad()
  updateMediaPath() {
    this.name = `${DotEnvConfig.BASE_URL}/public/uploads/${this.name}`;
  }
}
