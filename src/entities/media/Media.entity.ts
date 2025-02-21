import { AfterLoad, Column, Entity, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { Business } from "../business/Business.entity";
import { MediaType } from "../../constants/appConstants";
import { DotEnvConfig } from "../../config/dotenv.config";
import { User } from "../user/User.entity";


@Entity()
export class Media extends CommonEntity {
  @Column()
  mimeType: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: MediaType })
  type: MediaType;

  @OneToOne(() => Business, (business) => business.businessRegistrationDocument)
  businessRegistrationDocument: string;

  @OneToOne(() => Business, (business) => business)
  businessLogo: string;

  @OneToOne(() => Business, (business) => business.coverImage)
  businessCover: string;

  @OneToOne(() => Business, (business) => business.ownerVerificationDocument)
  ownerVerificationDocument: string;

  @AfterLoad()
  updateMediaPath() {
    this.name = `${DotEnvConfig.BASE_URL}/public/uploads/${this.name}`;
  }
}
