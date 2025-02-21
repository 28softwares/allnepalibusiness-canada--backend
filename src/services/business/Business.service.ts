import { CreateBusinessDTO } from "../../dtos/business/Business.dto";
import { Business } from "../../entities/business/Business.entity";
import { Media } from "../../entities/media/Media.entity";
import { AppError } from "../../utils/appError.util";

class BusinessService {
  async get() {
    return await Business.find({
      relations: ['businessRegistrationDocument', 'logo', 'coverImage', 'ownerVerificationDocument']
    });
  }

  async create(data: CreateBusinessDTO) {
    const business = new Business();
    business.businessName = data.businessName;
    business.description = data.description;
    business.address = data.address;
    business.category = data.category;
    business.website = data.website;
    business.businessContactInformation = data.businessContactInformation;
    business.socialHandles = data.socialHandles;

    const businessRegistrationDoc = await Media.findOne({
      where: {
        id: data.businessRegistrationDocument
      },
      relations: ['business']
    });

    if (!businessRegistrationDoc) throw AppError.notFound("Business registration document not found");
    business.businessRegistrationDocument = businessRegistrationDoc;

    const businessLogo = await Media.findOne({
      where: {
        id: data.logo
      },
      relations: ['business']
    });

    if (!businessLogo) throw AppError.notFound("Business logo not found");
    business.logo = businessLogo;

    const businessCoverPhoto = await Media.findOne({
      where: {
        id: data.coverImage
      },
      relations: ['business']
    });

    if (!businessCoverPhoto) throw AppError.notFound("Business cover photo not found");
    business.coverImage = businessCoverPhoto;

    const ownerVerificationDocument = await Media.findOne({
      where: {
        id: data.ownerVerificationDocument
      },
      relations: ['business']
    });

    if (!ownerVerificationDocument) throw AppError.notFound("Owner verification document not found")
    business.ownerVerificationDocument = ownerVerificationDocument;

    await business.save();

    return { message: "Business created successfully" };

  }
}

export default new BusinessService();
