import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import * as crypto from 'crypto';
import { CurrentUser } from '../auth/decorator/current-user';
import { User } from '../user/schema/user.schema';
import { Request, Response } from 'express';
import { environments } from 'src/config/environment';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/pay')
  async initilizePayment(
    @CurrentUser() user: User,
    @Body() body: { amount: number },
  ) {
    return await this.paymentService.initializePayment(user.id, body.amount);
  }

  @Post('/webhooks/paystack')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-paystack-signature') signature: string,
  ) {
    const secret = environments.paystack_secret_key;
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
    }
    await this.paymentService.handleWebwookEvent(req.body);
    res.status(200).send('Webhook received');
  }
}
