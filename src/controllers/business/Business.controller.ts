import { Controller, Route, Get, Request, Post, Body, Tags, Patch } from "tsoa";
import express from "express";
import BusinessService from "../../services/business/Business.service";
import { CreateBusinessDTO } from "../../dtos/business/Business.dto";
import { VisibilityStatus } from "../../entities/business/Business.entity";

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
  @Get("/all")
  public async getBusiness() {
    return await BusinessService.get();
  }

  @Patch("/update-status")
  public async updateBusinessStatus(@Request() req: express.Request, @Body() body: { id: string, status: VisibilityStatus, remarks: string }) {
    const updateData = { status: body.status, remarks: body.remarks };
    return await BusinessService.updateBusinessStatus(body.id, updateData);
  }
}
