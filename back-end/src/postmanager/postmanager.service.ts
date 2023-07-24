import { Injectable, NotFoundException } from '@nestjs/common';
import { Postmanager } from './schemas/postmanager.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

@Injectable()
export class PostmanagerService {
    constructor(
        @InjectModel(Postmanager.name) private postmanagerModel: mongoose.Model<Postmanager>,
    ) { }

    async getAllPostmanager(): Promise<Postmanager[]> {
        const postmanagers = await this.postmanagerModel.find();
        return postmanagers;
    }

    async getPostmanager(id: string): Promise<Postmanager> {
        const postmanager= await this.postmanagerModel.findById(id);
        if (!postmanager) {
            throw new NotFoundException('user not found.');
        }
        return postmanager;
    }

    async createPostmanager(postmanager: Postmanager): Promise<Postmanager> {
        const res = this.postmanagerModel.create(postmanager);
        return res;
    }

    async updatePostmanager(id: string, postmanager: Postmanager): Promise<Postmanager> {
        const res = await this.postmanagerModel.findByIdAndUpdate(id, postmanager, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async deletePostmanager(id: string) {
        const res = await this.postmanagerModel.findByIdAndDelete(id);
        return res;
    }
}