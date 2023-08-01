import { Injectable, NotFoundException } from '@nestjs/common';
import { Postmanager } from './schemas/postmanager.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

@Injectable()
export class PostmanagerService {
    constructor(
        @InjectModel(Postmanager.name) private postmanagerModel: mongoose.Model<Postmanager>,
    ) { }

    async getNumberPostmanager(pageOption: {
        page?: number,
        show?: number,
      }): Promise<{ data: Postmanager[], count: number }> {
        const limit = pageOption?.show;
        const skip = (pageOption?.page - 1) * pageOption?.show;
        const sortOptions: any = {};
        sortOptions.updatedAt = -1; 
        const postmanagers = await this.postmanagerModel.find().skip(skip).limit(limit).sort(sortOptions).exec();
      
        if (!postmanagers || postmanagers.length === 0) {
          throw new NotFoundException('No postmanagers found in the requested page.');
        }
      
        const totalCount = await this.postmanagerModel.countDocuments(); // Lấy tổng số lượng bản ghi trong collection
      
        return {
          data: postmanagers,
          count: totalCount,
        };
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