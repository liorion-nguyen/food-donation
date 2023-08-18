import { Controller, Get, Param, Post } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import internal from 'stream';

@Controller('confirm-email')
export class ConfirmEmailController {
    constructor(private readonly confirmEmailService: ConfirmEmailService) {}

    @Get(':mail')
    async sendConfirmationEmail(@Param('mail') mail: string) { 
        await this.confirmEmailService.generateCode(mail);
        return 'Confirmation email sent successfully';
    }

    @Get('veri/:mail')
    async getCode(@Param('mail') mail: string) {
        const code = this.confirmEmailService.getCode();
        return { code };
    }

    @Get('checkmail/:mail')
    async checkDuplicatesckMail(@Param('mail') mail: string) {
        const isCheck = await this.confirmEmailService.checkMailDuplicates(mail);
        return isCheck;
    }

    @Get('checkusername/:username')
    async checkDuplicatesckUsername(@Param('username') username: string) {
        const isCheck = await this.confirmEmailService.checkUsernameDuplicates(username);
        return isCheck;
    }

    @Post('confirm/:code')
    async confirmCode(@Param('code') code: string) {
        const isValid = await this.confirmEmailService.validateCode(code);
        if(isValid) {
            return true;
        }
        else {
            return false;
        }
    }
}
