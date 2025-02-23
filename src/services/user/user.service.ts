import { Business } from "../../entities/business/Business.entity";
import { User } from "../../entities/user/User.entity";
import { SearchQuery } from "../../interfaces/queryInterface";
import { AppError } from "../../utils/appError.util";
import { paginateResponse, skipTakeMaker } from "../../utils/pageAndLimit";

class UserService {
  async getUserById(id: string) {
    const user = await User.findOne({ where: { id }, select: ['id', 'email', 'fullName'] });
    if (!user) throw AppError.notFound("User not found");
    return user;
  }

  async getBusinessByUserId(searchQuery: SearchQuery, id: string) {
    const { skip, take } = skipTakeMaker({
      page: searchQuery?.page,
      limit: searchQuery?.limit,
    });
    const businesses = await Business.createQueryBuilder('business')
      .andWhere(`business.owner.id = :id`, { id })
      .take(take)
      .skip(skip)
      .getManyAndCount();
    if (!businesses) throw AppError.notFound("Business not found");

    return paginateResponse(businesses, take, skip);
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email }, select: ['id', 'email', 'fullName'] });
    if (!user) throw AppError.notFound("User not found");
    return user;
  }

}


export default new UserService();