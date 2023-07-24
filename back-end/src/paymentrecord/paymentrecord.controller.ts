import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentrecordDto } from './dto/paymentrecord.dto';
import { Paymentrecord } from './schema/paymentrecord.schema';
import { PaymentrecordService } from './paymentrecord.service';

@Controller('paymentrecords')
export class PaymentrecordController {
    constructor(private paymentrecordService: PaymentrecordService) {}

    @Get()
    async getAllPaymentrecord(): Promise<Paymentrecord[]> {
        return this.paymentrecordService.getAllPaymentrecord();
    }

    @Post() 
    async createPaymentrecord(@Body() paymentrecord: PaymentrecordDto): Promise<Paymentrecord> {
        return this.paymentrecordService.createPaymentrecord(paymentrecord);
    }

    @Put(':id') 
    async update(
        @Param('id')
        id: string,
        @Body() paymentrecord: PaymentrecordDto,
    ): Promise<Paymentrecord> {
        return this.paymentrecordService.updatePaymentrecord(id, paymentrecord);
    }

    @Delete(':id')
    async deletePaymentrecord(
        @Param('id')
        id: string,
    ) {
        return this.paymentrecordService.deletePaymentrecord(id);
    }
}
