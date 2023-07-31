import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Paymentrecord } from './schema/paymentrecord.schema';

@Injectable()
export class PaymentrecordService {
    constructor(
        @InjectModel(Paymentrecord.name) private paymentrecordModel: mongoose.Model<Paymentrecord>,
    ) { }

    async getNumberPaymentrecord(pageOption: {
        page?: number,
        show?: number,
    }): Promise<{ data: Paymentrecord[], count: number }> {
        const limit = pageOption?.show;
        const skip = (pageOption?.page - 1) * pageOption?.show;
        const sortOptions: any = {};
        sortOptions.updatedAt = -1; 
        const paymentrecords = await this.paymentrecordModel.find().skip(skip).limit(limit).sort(sortOptions).exec();

        if (!paymentrecords || paymentrecords.length === 0) {
            throw new NotFoundException('No paymentrecords found in the requested page.');
        }

        const totalCount = await this.paymentrecordModel.countDocuments(); // Lấy tổng số lượng bản ghi trong collection

        return {
            data: paymentrecords,
            count: totalCount,
        };
    }

    async getPaymentrecord(id: string): Promise<Paymentrecord> {
        const paymentrecord = await this.paymentrecordModel.findById(id);
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
