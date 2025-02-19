import { AfterLoad, Column, Entity, OneToOne } from "typeorm";
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
    this.name = `${DotEnvConfig.BASE_URL}/public/uploads/${this.name}`;
  }
}
