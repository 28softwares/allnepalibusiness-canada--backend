import { Controller, Route, Get, Request, Post, Body, Tags } from "tsoa";
import express from "express";
import BusinessService from "../../services/business/Business.service";
import { CreateBusinessDTO } from "../../dtos/business/Business.dto";

@Route("/business")
@Tags("Business")
export class BusinessController extends Controller {
  @Post("/")
  async createBusiness(
    @Request() req: express.Request,
    @Body() body: CreateBusinessDTO
  ) {
    return await BusinessService.create(body);
  }
  // @Get("getBusiness")
  // public async getBusiness(@Request() req: express.Request): Promise<any> {
  //   return await BusinessService.create(req.body);
  // }
}
