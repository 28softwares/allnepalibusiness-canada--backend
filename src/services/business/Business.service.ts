import { CreateBusinessDTO } from "../../dtos/business/Business.dto";
import { Business, VisibilityStatus } from "../../entities/business/Business.entity";
import { Media } from "../../entities/media/Media.entity";
import { AppError } from "../../utils/appError.util";
import userService from "../user/user.service";

class BusinessService {
  async get() {
    return await Business.find({
      relations: ['businessRegistrationDocument', 'logo', 'coverImage', 'ownerVerificationDocument']
    });
  }

  async create(data: CreateBusinessDTO) {
    console.warn("received data", data)
    const owner = await userService.getUserById(data.ownerId);
    const business = new Business();
    business.businessName = data.businessName;
    business.description = data.description;
    business.address = data.address;
    business.category = data.category;
    business.website = data.website;
    business.businessContactInformation = data.businessContactInformation;
    business.socialHandles = data.socialHandles;

    if (!owner) throw AppError.notFound("Owner is not registered!");
    business.owner = owner;

    const businessRegistrationDoc = await Media.findOne({
      where: {
        id: data.businessRegistrationDocument
      },
    });

    if (!businessRegistrationDoc) throw AppError.notFound("Business registration document not found");
    business.businessRegistrationDocument = businessRegistrationDoc;

    const businessLogo = await Media.findOne({
      where: {
        id: data.logo
      },
    });

    if (!businessLogo) throw AppError.notFound("Business logo not found");
    business.logo = businessLogo;

    const businessCoverPhoto = await Media.findOne({
      where: {
        id: data.coverImage
      },
    });

    if (!businessCoverPhoto) throw AppError.notFound("Business cover photo not found");
    business.coverImage = businessCoverPhoto;

    const ownerVerificationDocument = await Media.findOne({
      where: {
        id: data.ownerVerificationDocument
      },
    });

    if (!ownerVerificationDocument) throw AppError.notFound("Owner verification document not found")
    business.ownerVerificationDocument = ownerVerificationDocument;

    await business.save();

    return { message: "Business created successfully" };

  }

  async updateBusinessStatus(id: string, updateData: { status: VisibilityStatus, remarks: string }) {
    const business = await Business.findOne({ where: { id: id } });
    if (!business) throw AppError.notFound("Business not found");

    const { status, remarks } = updateData;

    try {
      const newStatusEntry = {
        status: status,
        remarks: remarks ?? ' ',
      };

      // Check if approvalStatus exists and has entries
      if (business.visibility && business.visibility.length > 0) {
        const currentStatus = business.visibility[business.visibility.length - 1].status;
        if (status === currentStatus) {
          throw AppError.badRequest('No changes in status detected!');
        }
      }
      // Initialize approvalStatus as an empty array if it doesn't exist
      if (!business.visibility) {
        business.visibility = [];
      }

      const result = await Business.createQueryBuilder('business')
        .update(Business)
        .set({ visibility: [...business.visibility, newStatusEntry] })
        .where('id = :id', { id })
        .returning('*')
        .execute();

      return { message: "Business status updated successfully", result };
    } catch (error) {
      console.error("Error updating business status", error);
      throw AppError.badRequest("Business status update failed");
    }
  }


  async getBusinessById(id: string) {
    const business = await Business.findOne({ where: { id: id } });
    if (!business) throw AppError.notFound("Business not found");
    return business;
  }
}

export default new BusinessService();
