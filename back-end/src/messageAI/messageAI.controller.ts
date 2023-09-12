import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AbilitiesGuard } from 'src/user/ability/ability.guard';
import { CheckAbilities, ReadUserAbility } from 'src/user/ability/abilities.decorator';
import { MessageAIService } from './messageAI.service';
import { MessageAI } from './schemas/messageAI.schema';
import { MessageAIDto } from './dto/create-update.dto';

@Controller('messageAI')
export class MessageAIController {
    constructor(private messageAIService: MessageAIService) { }

    @Get()
    async getNumberMessageAI(): Promise<{ data: MessageAI[], count: number }> {
        return this.messageAIService.getNumberMessageAI();
    }

    @Post()
    async createMessageAI(@Body() messageAI: MessageAIDto): Promise<MessageAI> {
        return this.messageAIService.createMessageAI(messageAI);
    }

    @Put(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async update(
        @Param('id')
        id: string,
        @Body() messageAI: MessageAIDto,
    ): Promise<MessageAI> {
        return this.messageAIService.updateMessageAI(id, messageAI);
    }

    @Delete(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async deleteMessageAI(
        @Param('id')
        id: string,
    ) {
        return this.messageAIService.deleteMessageAI(id);
    }
}
