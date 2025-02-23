import { Business, VisibilityStatus } from "../../entities/business/Business.entity";
import { User } from "../../entities/user/User.entity";
import { SearchQuery } from "../../interfaces/queryInterface";
import { AppError } from "../../utils/appError.util";
import { paginateResponse, skipTakeMaker } from "../../utils/pageAndLimit";

class AdminService {
  async getAllUsers(searchQuery: SearchQuery) {
    const { skip, take } = skipTakeMaker({
      page: searchQuery?.page,
      limit: searchQuery?.limit,
    });

    const builder = User.createQueryBuilder('user')
    if (searchQuery?.search) {
      builder
        .where('user.fullName ILIKE :search', {
          search: `%${searchQuery.search}%`,
        })
        .orWhere('user.email ILIKE :search', {
          search: `%${searchQuery.search}%`,
        });
    }
    const users = await builder.take(take).skip(skip).getManyAndCount();

    if (!users) throw AppError.notFound("No user found");
    return paginateResponse(users, take, skip);
  }

  async getAllBusinesses(searchQuery: SearchQuery) {
    const { skip, take } = skipTakeMaker({
      page: searchQuery?.page,
      limit: searchQuery?.limit,
    });
    const businesses = await Business.createQueryBuilder('business')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    if (!businesses) throw AppError.notFound("No business found");
    return paginateResponse(businesses, take, skip);
  }

  async getApprovedBusinesses(searchQuery: SearchQuery) {
    const { skip, take } = skipTakeMaker({
      page: searchQuery?.page,
      limit: searchQuery?.limit,
    });
    const businesses = await Business.createQueryBuilder('business')
      .andWhere(`visibility[jsonb_array_length(business.visibility) - 1]->>'status' = :status`, {
        status: VisibilityStatus.APPROVED
      })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    if (!businesses) throw AppError.notFound("No approved business found");
    return paginateResponse(businesses, take, skip);
  }

  async getPendingBusinesses(searchQuery: SearchQuery) {
    const { skip, take } = skipTakeMaker({
      page: searchQuery?.page,
      limit: searchQuery?.limit,
    });
    const businesses = await Business.createQueryBuilder('business')
      .andWhere(`visibility[jsonb_array_length(business.visibility) - 1]->>'status' = :status`, {
        status: VisibilityStatus.PENDING
      })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    if (!businesses) throw AppError.notFound("No pending business found");

    return paginateResponse(businesses, take, skip);
  }



  async getRejectedBusinesses(searchQuery: SearchQuery) {
    const { skip, take } = skipTakeMaker({
      page: searchQuery?.page,
      limit: searchQuery?.limit,
    });

    const businesses = await Business.createQueryBuilder('business')
      .andWhere(`visibility[jsonb_array_length(business.visibility) - 1]->>'status' = :status`, {
        status: VisibilityStatus.REJECTED
      })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    if (!businesses) throw AppError.notFound("No rejected business found");

    return paginateResponse(businesses, take, skip);
  }

}

export default new AdminService();