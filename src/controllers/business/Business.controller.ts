import { Controller, Route, Get, Request } from "tsoa";
import express from "express";
import BusinessService from "../../services/business/Business.service";

@Route("business")
export class BusinessController extends Controller {
  @Get("getBusiness")
  public async getBusiness(@Request() req: express.Request): Promise<any> {
    return await BusinessService.create(req.body);
  }

  
}
