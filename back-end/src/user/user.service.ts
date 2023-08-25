import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
    ) { }

    async getAllUser(pageOption: {
        page?: number,
        show?: number,
        key?: string,
    }, authorization: string,): Promise<{ data: User[], count: number }> {
        const limit = pageOption?.show;
        const skip = (pageOption?.page - 1) * pageOption?.show;
        const sortOptions: any = {};
        sortOptions.updatedAt = -1;

        let query: any = {}; // Điều kiện truy vấn

        if (pageOption.key) {
            query.username = { $regex: pageOption.key, $options: 'i' }; // i: không phân biệt chữ hoa/thường
        }

        const users = await this.userModel
            .find(query)
            .skip(skip)
            .limit(limit)
            .sort(sortOptions)
            .exec();

        if (!users || users.length === 0) {
            throw new NotFoundException('No users found in the requested page.');
        }

        const totalCount = await this.userModel.countDocuments(query);

        return {
            data: users,
            count: totalCount,
        };
    }

    async findOne(username: string): Promise<any> {
        const res = await this.userModel.findOne({
            username: username
        });
        return res;
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('user not found.');
        }
        return user;
    }

    async getUserComment(id: string): Promise<{ fullname: string; avatar: string; id: string; username: string }> {
        const user = await this.userModel.findById(id, 'fullname avatar id username').exec();
      
        if (!user) {
          throw new NotFoundException('User not found.');
        }
      
        return {
          fullname: user.fullname,
          avatar: user.avatar,
          id: user.id,
          username: user.username,
        };
      }
    
    async createUser(user: User): Promise<any> {
        const hash: any = await bcrypt.hash(
            user.password,
            10,
        );
        user.password = hash;
        const res = this.userModel.create(user);

        return res;
    }

    async updateUser(id: string, user: User): Promise<User> {
        const res = await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async deleteUser(id: string) {
        const res = await this.userModel.findByIdAndDelete(id);
        return res;
    }
}
