import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './schemas/location.schema';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { AbilitiesGuard } from 'src/user/ability/ability.guard';
import { CheckAbilities, ReadUserAbility } from 'src/user/ability/abilities.decorator';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) { }

  @Get()
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  async getNumberLocation(
    @Query() pageOption: {
      page?: number,
      show?: number,
    }
  ): Promise<{ data: Location[], count: number }> {
    if (pageOption.page && pageOption.page < 1) {
      throw new BadRequestException('Invalid page number. Page number must be greater than or equal to 1.');
    }
    return this.locationService.getNumberLocation(pageOption);
  }

  @Get('newfeeds')
  async getNumberNewFeed(
    @Query() pageOption: {
      page?: number,
      show?: number,
    }
  ): Promise<{ data: Location[], count: number }> {
    if (pageOption.page && pageOption.page < 1) {
      throw new BadRequestException('Invalid page number. Page number must be greater than or equal to 1.');
    }
    return this.locationService.getNumberLocation(pageOption);
  }

  @Post()
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  async createLocation(@Body() location: CreateLocationDto): Promise<Location> {
    return this.locationService.createLocation(location);
  }

  @Put(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  async update(
    @Param('id')
    id: string,
    @Body() location: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, location);
  }

  @Delete(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  async deleteLocation(
    @Param('id')
    id: string,
  ) {
    return this.locationService.deleteLocation(id);
  }
}