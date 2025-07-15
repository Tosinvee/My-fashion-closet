import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { UserModule } from './user/user.module';
import { ClotheModule } from './closet/closet.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [UserModule, ClotheModule, AuthModule, MailModule, PaymentModule],
})
export class FeaturesModule {}
