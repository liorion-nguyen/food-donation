import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaymentrecordDto } from './dto/paymentrecord.dto';
import { Paymentrecord } from './schema/paymentrecord.schema';
import { PaymentrecordService } from './paymentrecord.service';

@Controller('paymentrecords')
export class PaymentrecordController {
    constructor(private paymentrecordService: PaymentrecordService) {}

    @Get()
    async getNumberPaymentrecord(
      @Query() pageOption: {
        page?: number,
        show?: number,
      }
    ): Promise<{ data: Paymentrecord[], count: number }> {
      if (pageOption.page && pageOption.page < 1) {
        throw new BadRequestException('Invalid page number. Page number must be greater than or equal to 1.');
      }
      return this.paymentrecordService.getNumberPaymentrecord(pageOption);
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
