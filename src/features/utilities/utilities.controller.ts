import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UtilityService } from './utilities.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Post('file-upload')
  @UseInterceptors(FilesInterceptor('file', 5))
  async uploadFile(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    if (!files || files.length == 0) {
      throw new BadRequestException('No file uploaded');
    }
    return this.utilityService.filesUpload(files);
  }
}
