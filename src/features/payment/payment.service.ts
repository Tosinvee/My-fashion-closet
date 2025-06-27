import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schema/payment.schema';
import { Model, ObjectId } from 'mongoose';
import { User } from '../user/schema/user.schema';
import axios from 'axios';
import { environments } from 'src/config/environment';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymnentModel: Model<Payment>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async initializePayment(userId: ObjectId, amount: number) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: user.email,
        amount: amount * 100,
      },
      {
        headers: {
          Authorization: `Bearer ${environments.paystack_secret_key}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const { authorization_url, reference } = response.data.data;
    await this.paymnentModel.create({
      userId,
      email: user.email,
      amount,
      transcationId: reference,
      status: 'pending',
    });
    return authorization_url;
  }

  async handleWebwookEvent(event: any) {
    const data = event.data;
    const reference = data.reference;

    if (event.event === 'charge.sucess' && data.status === 'success') {
      await this.paymnentModel.findOneAndUpdate(
        { transcationId: reference },
        {
          status: 'paid',
          paidedAt: new Date(),
        },
      );
    }
  }
}
