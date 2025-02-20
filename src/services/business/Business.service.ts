import { CreateBusinessDTO } from "../../dtos/business/Business.dto";
import { Business } from "../../entities/business/Business.entity";
import { Media } from "../../entities/media/Media.entity";

class BusinessService {
  async get() {
    return await Business.find();
  }

  async create(data: CreateBusinessDTO) {
    const business = new Business();
    business.businessName = data.name;
    business.description = data.description;
    business.address = data.address;
    business.category = data.category;
    business.website = data.website;
    business.businessContactInformation = data.businessContactInformation;
    business.socialHandles = data.socialHandles;

    const businessRegistrationDoc = await Media.findOne({
      where: {
        id: data.registrationDocumentId,
      },
    });

    if (!businessRegistrationDoc) return { message: "Business registration document not found" };
    business.businessRegistrationDocument = businessRegistrationDoc.id;

    const businessLogo = await Media.findOne({
      where: {
        businessLogo: data.logo,
      },
    });

    if (!businessLogo) return { message: "Business logo not found" };
    business.logo = businessLogo;

    const businessCoverPhoto = await Media.findOne({
      where: {
        businessCover: data.coverImage,
      },
    });

    if (!businessCoverPhoto)
      return { message: "Business cover photo not found" };
    business.coverImage = businessCoverPhoto;

    // const ownerIDDoc = await Media.findOne({
    //   where: {
    //     id: data.owner.verificationDocument,
    //   },
    // });

    // if (!ownerIDDoc) return { message: "Owner ID document not found" };
    // business.owner.verificationDocument = ownerIDDoc;

    await business.save();

    return { message: "Business created successfully" };

  }
}

export default new BusinessService();
