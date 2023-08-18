import { Module } from '@nestjs/common';
import { PostmanagerController } from './postmanager.controller';
import { PostmanagerService } from './postmanager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostmanagerSchema } from './schemas/postmanager.schema';
import { AbilityModule } from 'src/user/ability/ability.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Postmanager',
        schema: PostmanagerSchema,
      },
    ]),
    AbilityModule,
  ],
  controllers: [PostmanagerController],
  providers: [PostmanagerService],
})
export class PostmanagerModule {}
