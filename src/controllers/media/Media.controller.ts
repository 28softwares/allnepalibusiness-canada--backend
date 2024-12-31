import { Controller, Route, UploadedFile, Post, Request } from "tsoa";
import express from "express";
import multer from "multer";
import fs from "fs";
import { Media, MediaType } from "../../entities/media/Media.entity";

@Route("media")
export class MediaController extends Controller {
  @Post("/")
  public async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: express.Request // ? type=BUSINESS_LOGO
  ): Promise<any> {
    if (!req.body.type) {
      this.setStatus(400);
      return { message: "Media type is required" };
    }

    //   if media type is not of MediaType enum the return error
    if (!Object.values(MediaType).includes(req.body.type)) {
      this.setStatus(400);
      return { message: "Invalid media type" };
    }

    //   save file.buffer media to public/uploads

    const bufferString = Buffer.from(file.buffer);
    const mediaName = new Date() + "." + file.originalname.split(".")[1];
    if (!fs.existsSync("public/uploads")) {
      fs.mkdirSync("public/uploads", { recursive: true });
    }

    fs.writeFileSync(`public/uploads/${mediaName}`, bufferString);

    console.log("file", file);
    const media = new Media();
    media.name = mediaName;
    media.mimeType = file.mimetype;
    media.type = req.body.type;
    await media.save();
    return { message: "Media uploaded successfully" };
  }
}
