import { CreateBusinessDTO } from "../../dtos/business/Business.dto";
import { Business } from "../../entities/business/Business.entity";
import { Media } from "../../entities/media/Media.entity";

class BusinessService {
  async create(data: CreateBusinessDTO) {
    const business = new Business();
    business.name = data.name;
    business.email = data.email;
    business.type = data.type;

    const businessRegistrationDoc = await Media.findOne({
      where: {
        businessRegistration: data.registrationDocument,
      },
    });

    if (!businessRegistrationDoc)
      return { message: "Business registration document not found" };
    business.registrationDocument = businessRegistrationDoc;

    const ownerIDDoc = await Media.findOne({
      where: {
        ownerId: data.ownerIDDocument,
      },
    });

    // if (!ownerIDDoc) return { message: "Owner ID document not found" };
    // business.ownerIdDocument = ownerIDDoc;

    business.provinceTerritory = data.provinceTerritory;
    business.city = data.city;
    business.postalCode = data.postalCode;
    business.phone = data.phone;
    business.website = data.website;
    business.description = data.description;

    const businessLogo = await Media.findOne({
      where: {
        businessLogo: data.logo,
      },
    });

    if (!businessLogo) return { message: "Business logo not found" };
    business.logo = businessLogo;

    const businessCoverPhoto = await Media.findOne({
      where: {
        businessCover: data.cover,
      },
    });

    if (!businessCoverPhoto)
      return { message: "Business cover photo not found" };
    business.cover = businessCoverPhoto;

    business.socialHandles = data.socialHandles;

    await business.save();

    return { message: "Business created successfully" };
  }
}

export default new BusinessService();
