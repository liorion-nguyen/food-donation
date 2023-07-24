import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Reward } from './schema/Reward.schema';
import { RewardDto } from './dto/Reward.dto';
import { RewardService } from './reward.service';

@Controller('rewards')
export class RewardController {
    constructor(private rewardService: RewardService) {}

    @Get()
    async getAllReward(): Promise<Reward[]> {
        return this.rewardService.getAllReward();
    }

    @Post() 
    async createReward(@Body() reward: RewardDto): Promise<Reward> {
        return this.rewardService.createReward(reward);
    }

    @Put(':id') 
    async update(
        @Param('id')
        id: string,
        @Body() reward: RewardDto,
    ): Promise<Reward> {
        return this.rewardService.updateReward(id, reward);
    }

    @Delete(':id')
    async deleteReward(
        @Param('id')
        id: string,
    ) {
        return this.rewardService.deleteReward(id);
    }
}
