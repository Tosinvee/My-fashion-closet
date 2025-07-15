import { Module } from '@nestjs/common';
import { UtilityService } from './utilities.service';
import { UtilityController } from './utilities.controller';
import { CloudinaryConfig } from './cloudinary.config';

@Module({
  providers: [UtilityService, CloudinaryConfig],
  controllers: [UtilityController],
})
export class UtilitiesModule {}
