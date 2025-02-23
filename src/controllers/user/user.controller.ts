import { Body, Controller, Queries } from "tsoa";
import userService from "../../services/user/user.service";
import { SearchQuery } from "../../interfaces/queryInterface";

export class UserController extends Controller {
  async getUserById(@Body() id: string) {
    return await userService.getUserById(id);
  }


  async getBusinessByUserId(@Queries() searchQuery: SearchQuery, @Body() id: string) {
    return await userService.getBusinessByUserId(searchQuery, id);
  }
}