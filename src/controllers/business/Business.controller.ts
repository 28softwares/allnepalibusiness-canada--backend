import {
  Controller,
  Route,
  Get,
  Request,
  Post,
  Tags,
  Middlewares,
  Body,
} from "tsoa";
import express from "express";
import BusinessService from "../../services/business/Business.service";
import validatorDto from "../../middlewares/requestValidator.middleware";
import { UpdateBusinessDTO } from "../../dtos/business/Business.dto";

@Route("/business")
@Tags("Business")
export class BusinessController extends Controller {
  @Get("/")
  public async getBusiness(@Request() req: express.Request): Promise<any> {
    return await BusinessService.create(req.body);
  }

  @Post("/")
  @Middlewares(validatorDto(UpdateBusinessDTO))
  public async createBusiness(@Body() body: UpdateBusinessDTO): Promise<any> {
    return await BusinessService.create(body);
  }
}
