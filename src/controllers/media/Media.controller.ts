import express from 'express';
import {
  Controller,
  FormField,
  Post,
  Route,
  Request,
  UploadedFile,
  Tags,
} from 'tsoa';
import path from 'path';
import fs from 'fs';
import { DotEnvConfig } from '../../config/dotenv.config';
import { MediaType } from '../../constants/appConstants';
import { AppError } from '../../utils/appError.util';
import mediaService from '../../services/media/media.service';
@Tags('Media')
@Route('media')
class MediaController extends Controller {
  @Post('/')
  async upload(
    @Request() req: express.Request,
    @UploadedFile() file: Express.Multer.File,
    @FormField() mediaType: MediaType,
  ) {
    //enum => array. (values)
    const validMediaTypeList = Object.values(MediaType);
    if (!validMediaTypeList.includes(mediaType as MediaType)) {
      throw AppError.badRequest('Invalid media type');
    }

    const validateResponse = this.validate(mediaType as MediaType, file);
    if (validateResponse !== true) return validateResponse;
    // upload.

    //generate file name;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const updatedFileName = uniqueSuffix + ext;

    if (!fs.existsSync(DotEnvConfig.TEMP_FOLDER_PATH)) {
      fs.mkdirSync(DotEnvConfig.TEMP_FOLDER_PATH, { recursive: true });
    }

    fs.writeFileSync(
      path.resolve(DotEnvConfig.TEMP_FOLDER_PATH, updatedFileName),
      file.buffer,
    );

    const res = await mediaService.uploadSingle(
      mediaType as MediaType,
      file.mimetype,
      updatedFileName,
    );

    return res;
  }

  //
  private validate(mediaType: MediaType, file: Express.Multer.File) {
    let acceptedExtensions: string[] = [];
    let fileSize: number = 0;

    //
    switch (mediaType) {
      case MediaType.PROFILE_IMAGE:
        acceptedExtensions = ['.jpeg', '.jpg', '.png'];
        fileSize = 1024 * 1024 * 1; // 1MB
        break;

      case MediaType.BUSINESS_LOGO:
        acceptedExtensions = ['.jpeg', '.jpg', '.png'];
        fileSize = 1024 * 1024 * 1; // 1MB
        break;

      case MediaType.RENTAL_IMAGE:
        acceptedExtensions = ['.jpeg', '.jpg', '.png'];
        fileSize = 1024 * 1024 * 2; // 2MB
        break;
      case MediaType.VERIFICATION_ID:
        acceptedExtensions = ['.jpeg', '.jpg', '.png'];
        fileSize = 1024 * 1024 * 2; // 2MB
        break;

      default:
    }

    //extension validation.
    if (!acceptedExtensions.includes(path.extname(file.originalname))) {
      throw AppError.badRequest(
        'File extension not supported. Supported extensions are : ' +
        acceptedExtensions.toString(),
      );
    }

    //fileSize validation.
    if (file.size > fileSize) {
      throw AppError.badRequest(
        'File size exceeded. Maximum size is : ' +
        fileSize / (1024 * 1024) +
        ' MB',
      );
    }

    return true;
  }
}

export { MediaController };
