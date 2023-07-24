import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Reward } from './schema/Reward.schema';

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(Reward.name) private rewardModel: mongoose.Model<Reward>,
    ) { }

    async getAllReward(): Promise<Reward[]> {
        const reward = await this.rewardModel.find();
        return reward;
    }

    async getReward(id: string): Promise<Reward> {
        const reward= await this.rewardModel.findById(id);
        if (!reward) {
            throw new NotFoundException('user not found.');
        }
        return reward;
    }

    async createReward(reward: Reward): Promise<Reward> {
        const res = this.rewardModel.create(reward);
        return res;
    }

    async updateReward(id: string, reward: Reward): Promise<Reward> {
        const res = await this.rewardModel.findByIdAndUpdate(id, reward, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async deleteReward(id: string) {
        const res = await this.rewardModel.findByIdAndDelete(id);
        return res;
    }
}
