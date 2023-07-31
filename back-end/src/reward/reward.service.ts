import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Reward } from './schema/Reward.schema';

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(Reward.name) private rewardModel: mongoose.Model<Reward>,
    ) { }

    async getNumberReward(pageOption: {
        page?: number,
        show?: number,
      }): Promise<{ data: Reward[], count: number }> {
        const limit = pageOption?.show;
        const skip = (pageOption?.page - 1) * pageOption?.show;
        const sortOptions: any = {};
        sortOptions.updatedAt = -1; 
        const rewards = await this.rewardModel.find().skip(skip).limit(limit).sort(sortOptions).exec();
      
        if (!rewards || rewards.length === 0) {
          throw new NotFoundException('No rewards found in the requested page.');
        }
      
        const totalCount = await this.rewardModel.countDocuments(); // Lấy tổng số lượng bản ghi trong collection
      
        return {
          data: rewards,
          count: totalCount,
        };
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
