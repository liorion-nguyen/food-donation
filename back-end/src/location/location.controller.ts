import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    Delete,
  } from '@nestjs/common';
  import { LocationService } from './location.service';
  import { Location } from './schemas/location.schema';
  import { UpdateLocationDto } from './dto/update-location.dto';
  import { CreateLocationDto } from './dto/create-location.dto';
  
  @Controller('locations')
  export class LocationController {
    constructor(private locationService: LocationService) {}
  
    @Get()
    async getAllLocation(): Promise<Location[]> {
      return this.locationService.getAllLocation();
    }
  
    @Post()
    async createLocation(@Body() location: CreateLocationDto): Promise<Location> {
      return this.locationService.createLocation(location);
    }
  
    @Put(':id')
    async update(
      @Param('id')
      id: string,
      @Body() location: UpdateLocationDto,
    ): Promise<Location> {
      return this.locationService.updateLocation(id, location);
    }
  
    @Delete(':id')
    async deleteLocation(
      @Param('id')
      id: string,
    ) {
      return this.locationService.deleteLocation(id);
    }
  }