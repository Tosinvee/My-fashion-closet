import { Module } from '@nestjs/common';
import { ClotheController } from './clothe.controller';
import { ClotheService } from './clothe.service';

@Module({
  controllers: [ClotheController],
  providers: [ClotheService]
})
export class ClotheModule {}
