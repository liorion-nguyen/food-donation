import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PaymentrecordDto } from './dto/paymentrecord.dto';
import { Paymentrecord } from './schema/paymentrecord.schema';
import { PaymentrecordService } from './paymentrecord.service';
import { AbilitiesGuard } from 'src/user/ability/ability.guard';
import { CheckAbilities, ReadUserAbility } from 'src/user/ability/abilities.decorator';

@Controller('paymentrecords')
export class PaymentrecordController {
    constructor(private paymentrecordService: PaymentrecordService) {}

    @Get()
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
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
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async createPaymentrecord(@Body() paymentrecord: PaymentrecordDto): Promise<Paymentrecord> {
        return this.paymentrecordService.createPaymentrecord(paymentrecord);
    }

    @Put(':id') 
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async update(
        @Param('id')
        id: string,
        @Body() paymentrecord: PaymentrecordDto,
    ): Promise<Paymentrecord> {
        return this.paymentrecordService.updatePaymentrecord(id, paymentrecord);
    }

    @Delete(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async deletePaymentrecord(
        @Param('id')
        id: string,
    ) {
        return this.paymentrecordService.deletePaymentrecord(id);
    }
}
