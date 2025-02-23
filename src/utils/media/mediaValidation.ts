import { MediaType } from '../../constants/appConstants';
import { AppError } from '../appError.util';
class MediaValidate {
    constructor(private error = AppError) { }
    validate(fileLength: number, mimetype: string, mediaType: MediaType) {
        let acceptedExtensions: string[] = [];
        let acceptedFileSize: number = 0;

        switch (mediaType) {
            case MediaType.BUSINESS_COVER:
                acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
                acceptedFileSize = 1024 * 1024 * 1; // 1 MB
                break;

            case MediaType.BUSINESS_REGISTRATION:
                acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
                acceptedFileSize = 1024 * 1024 * 1; // 1 MB
                break;

            case MediaType.OWNER_IDENTIFICATION_DOCUMENT:
                acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
                acceptedFileSize = 1024 * 1024 * 1; // 1 MB
                break;

            case MediaType.BUSINESS_LOGO:
                acceptedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
                acceptedFileSize = 1024 * 1024 * 1; // 1 MB
                break;
        }
        if (!acceptedExtensions.includes(mimetype)) {
            throw this.error.badRequest(
                'Invalid file extension. Allowed extensions are : ' +
                acceptedExtensions.toString(),
            );
        }

        if (fileLength > acceptedFileSize) {
            throw AppError.badRequest(
                'File size exceed. Its limit is : ' +
                acceptedFileSize / (1024 * 1024) +
                ' MB',
            );
        }

        return true;
    }
}

export default new MediaValidate();
