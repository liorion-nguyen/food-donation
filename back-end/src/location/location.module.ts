import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './schemas/location.schema';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { AbilityModule } from 'src/user/ability/ability.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Location',
        schema: LocationSchema,
      },
    ]),
    AbilityModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}