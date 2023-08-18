import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import mongoose from 'mongoose';
import * as nodemailer from 'nodemailer';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ConfirmEmailService {
    private transporter: nodemailer.Transporter;

    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.ACCOUNT_MAIL,
                pass: process.env.PASSWORD_MAIL,
            },
        });
    }

    private verificationCode: string = null;

    async generateCode(email: string): Promise<void> {
        this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);
        
        const mailOptions = {
            from: process.env.ACCOUNT_MAI,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${this.verificationCode}. This code will expire in 5 minutes.`,
        };
    
        await this.transporter.sendMail(mailOptions);
    }

    getCode() {
        return this.verificationCode;
    }

    clearCode() {
        this.verificationCode = null;
    }

    async checkMailDuplicates(mail: string): Promise<any> {
        const email = await this.userModel.findOne({ contact: mail }).exec();
        return !email; 
    }

    async checkUsernameDuplicates(username: string): Promise<any> {
        const user = await this.userModel.findOne({ username: username }).exec();
        return !user; 
    }

    @Cron('0 */5 * * * *') // Run every minute
    clearExpiredCode() {
        this.clearCode();
    }

    async validateCode(code: string) {
        if(code === this.verificationCode) {
            return true;
        }
        else {
            return false;
        }
    }

}
