import { Module } from '@nestjs/common';
import { ClosetController } from './closet.controller';
import { ClosetService } from './closet.service';

@Module({
  controllers: [ClosetController],
  providers: [ClosetService],
})
export class ClotheModule {}
