import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { MessageAI } from './schemas/messageAI.schema';
import axios from 'axios';

@Injectable()
export class MessageAIService {
    constructor(
        @InjectModel(MessageAI.name) private messageAIModel: mongoose.Model<MessageAI>,
    ) {}

    async getNumberMessageAI(): Promise<{ data: MessageAI[], count: number }> {
        const sortOptions: any = {};
        sortOptions.createAt = -1;
        const messageAIs = await this.messageAIModel
            .find()
            .sort(sortOptions)
            .exec();

        if (!messageAIs || messageAIs.length === 0) {
            throw new NotFoundException('No postmanagers found in the requested page.');
        }

        return {
            data: messageAIs,
            count: messageAIs.length,
        };
    }

    async createMessageAI(messageAI: MessageAI): Promise<MessageAI> {
        const res = this.messageAIModel.create(messageAI);
        return res;
    }

    async updateMessageAI(id: string, postmanager: MessageAI): Promise<MessageAI> {
        const res = await this.messageAIModel.findByIdAndUpdate(id, postmanager, {
            new: true,
            runValidators: true,
        });
        return res;
    }

    async deleteMessageAI(id: string) {
        const res = await this.messageAIModel.findByIdAndDelete(id);
        
        return res;
    }
}