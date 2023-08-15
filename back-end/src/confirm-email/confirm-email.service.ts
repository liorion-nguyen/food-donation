import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ConfirmEmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
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
        const mailOptions = {
            from: process.env.ACCOUNT_MAI,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${this.verificationCode}`,
        };

        await this.transporter.sendMail(mailOptions);
    }

    getCode() {
        return this.verificationCode;
    }

    clearCode() {
        this.verificationCode = null;
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
