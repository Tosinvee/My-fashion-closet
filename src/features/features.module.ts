import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ClotheModule } from './clothe/clothe.module';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [UserModule, CategoryModule, ClotheModule]
})
export class FeaturesModule {}
