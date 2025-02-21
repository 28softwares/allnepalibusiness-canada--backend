import { User } from "../../entities/user/User.entity";
import { AppError } from "../../utils/appError.util";

class UserService {
  async getUserById(id: string) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw AppError.notFound("User not found");
    return user;
  }


}


export default new UserService();