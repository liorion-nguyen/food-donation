import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Location } from './schemas/location.schema';

@Injectable()
export class LocationService {
    constructor(
        @InjectModel(Location.name) private locationModel: mongoose.Model<Location>,
    ) { }

    async getAllLocation(): Promise<Location[]> {
        const locations = await this.locationModel.find();
        return locations;
    }

    async getLocation(id: string): Promise<Location> {
        const location = await this.locationModel.findById(id);
        if (!location) {
            throw new NotFoundException('user not found.');
        }
        return location;
    }

    async createLocation(location: Location): Promise<Location> {
        const res = this.locationModel.create(location);
        return res;
    }
    async updateLocation(id: string, location: Location): Promise<Location> {
        const res = await this.locationModel.findByIdAndUpdate(id, location, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async deleteLocation(id: string) {
        const res = await this.locationModel.findByIdAndDelete(id);
        return res;
    }
}
