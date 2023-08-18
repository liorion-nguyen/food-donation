import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Reward } from './schema/Reward.schema';
import { RewardDto } from './dto/Reward.dto';
import { RewardService } from './reward.service';
import { AbilitiesGuard } from 'src/user/ability/ability.guard';
import { CheckAbilities, ReadUserAbility } from 'src/user/ability/abilities.decorator';

@Controller('rewards')
export class RewardController {
    constructor(private rewardService: RewardService) { }

    @Get()
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async getNumberReward(
        @Query() pageOption: {
            page?: number,
            show?: number,
        }
    ): Promise<{ data: Reward[], count: number }> {
        if (pageOption.page && pageOption.page < 1) {
            throw new BadRequestException('Invalid page number. Page number must be greater than or equal to 1.');
        }
        return this.rewardService.getNumberReward(pageOption);
    }

    @Post()
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async createReward(@Body() reward: RewardDto): Promise<Reward> {
        return this.rewardService.createReward(reward);
    }

    @Put(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async update(
        @Param('id')
        id: string,
        @Body() reward: RewardDto,
    ): Promise<Reward> {
        return this.rewardService.updateReward(id, reward);
    }

    @Delete(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async deleteReward(
        @Param('id')
        id: string,
    ) {
        return this.rewardService.deleteReward(id);
    }
}
