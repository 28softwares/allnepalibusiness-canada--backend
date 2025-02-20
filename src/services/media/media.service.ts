import { MediaType } from "../../constants/appConstants";
import { Media } from "../../entities/media/Media.entity";

class MediaService {
  async uploadSingle(mediaType: MediaType, mimeType: string, fileName: string) {
    const m = new Media();
    m.name = fileName;
    m.type = mediaType;
    m.mimeType = mimeType;
    return await m.save();
  }
}

export default new MediaService();
