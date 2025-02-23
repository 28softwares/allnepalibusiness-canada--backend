import { Controller, Get, Queries, Route, Tags } from "tsoa";
import adminService from "../../services/admin/admin.service";
import { SearchQuery } from "../../interfaces/queryInterface";


@Route("/su")
@Tags("Admin Routes")
export class AdminController extends Controller {

  @Get("/user")
  public async getAllUsers(@Queries() searchQuery: SearchQuery) {
    return await adminService.getAllUsers(searchQuery);
  }

  @Get("/business")
  public async getAllBusinesses(@Queries() searchQuery: SearchQuery) {
    return await adminService.getAllBusinesses(searchQuery);
  }

  @Get("/business/approved")
  public async getApprovedBusinesses(@Queries() searchQuery: SearchQuery) {
    return await adminService.getApprovedBusinesses(searchQuery);
  }

  @Get("/business/pending")
  public async getPendingBusinesses(@Queries() searchQuery: SearchQuery) {
    return await adminService.getPendingBusinesses(searchQuery);
  }
}