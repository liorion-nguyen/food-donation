import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import {MongooseModule} from '@nestjs/mongoose'
import { RewardSchema } from './schema/Reward.schema';
import { AbilityModule } from 'src/user/ability/ability.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Reward",
    schema: RewardSchema,
  }]),
  AbilityModule,
],
  controllers: [RewardController]
  ,
  providers: [RewardService]
})
export class RewardModule {}
