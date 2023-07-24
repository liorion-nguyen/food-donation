import { Module } from '@nestjs/common';
import { PostmanagerController } from './postmanager.controller';
import { PostmanagerService } from './postmanager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostmanagerSchema } from './schemas/postmanager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Postmanager',
        schema: PostmanagerSchema,
      },
    ]),
  ],
  controllers: [PostmanagerController],
  providers: [PostmanagerService],
})
export class PostmanagerModule {}
