<<<<<<< HEAD
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
=======
import { Controller, Route, Get, Request, Post, Body } from "tsoa";
import express from "express";
import BusinessService from "../../services/business/Business.service";
import { CreateBusinessDTO } from "../../dtos/business/Business.dto";
>>>>>>> main

@Route("/business")
@Tags("Business")
export class BusinessController extends Controller {
<<<<<<< HEAD
  @Get("/")
  public async getBusiness(@Request() req: express.Request): Promise<any> {
    return await BusinessService.create(req.body);
  }

  @Post("/")
  @Middlewares(validatorDto(UpdateBusinessDTO))
  public async createBusiness(@Body() body: UpdateBusinessDTO): Promise<any> {
    return await BusinessService.create(body);
  }
=======
  @Post("/")
  async createBusiness(@Request() req: express.Request, @Body() body: CreateBusinessDTO) {
    return await BusinessService.create(body);
  }
  // @Get("getBusiness")
  // public async getBusiness(@Request() req: express.Request): Promise<any> {
  //   return await BusinessService.create(req.body);
  // }
>>>>>>> main
}
