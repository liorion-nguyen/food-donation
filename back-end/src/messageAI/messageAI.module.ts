import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilityModule } from 'src/user/ability/ability.module';
import { MessageAISchema } from './schemas/messageAI.schema';
import { MessageAIController } from './messageAI.controller';
import { MessageAIService } from './messageAI.service';
import { MessageAIDto } from './dto/create-update.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MessageAI',
        schema: MessageAISchema,
      },
    ]),
    AbilityModule,
  ],
  controllers: [MessageAIController],
  providers: [MessageAIService],
})
export class MessageAIModule {}
