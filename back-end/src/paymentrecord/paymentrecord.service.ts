import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Paymentrecord } from './schema/paymentrecord.schema';

@Injectable()
export class PaymentrecordService {
    constructor(
        @InjectModel(Paymentrecord.name) private paymentrecordModel: mongoose.Model<Paymentrecord>,
    ) { }

    async getAllPaymentrecord(): Promise<Paymentrecord[]> {
        const paymentrecord = await this.paymentrecordModel.find();
        return paymentrecord;
    }

    async getPaymentrecord(id: string): Promise<Paymentrecord> {
        const paymentrecord= await this.paymentrecordModel.findById(id);
        if (!paymentrecord) {
            throw new NotFoundException('user not found.');
        }
        return paymentrecord;
    }

    async createPaymentrecord(paymentrecord: Paymentrecord): Promise<Paymentrecord> {
        const res = this.paymentrecordModel.create(paymentrecord);
        return res;
    }

    async updatePaymentrecord(id: string, paymentrecord: Paymentrecord): Promise<Paymentrecord> {
        const res = await this.paymentrecordModel.findByIdAndUpdate(id, paymentrecord, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async deletePaymentrecord(id: string) {
        const res = await this.paymentrecordModel.findByIdAndDelete(id);
        return res;
    }
}
