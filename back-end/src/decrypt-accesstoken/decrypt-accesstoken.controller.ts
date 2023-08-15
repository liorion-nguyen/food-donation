import { Body, Controller, Get, Param } from '@nestjs/common';
import { DecryptAccesstokenService } from './decrypt-accesstoken.service';

@Controller('decrypt-accesstoken')
export class DecryptAccesstokenController {
    constructor(private decryptAccesstokenService: DecryptAccesstokenService) { }
    @Get('/:accessToken')
    async decryptAccessToken(@Param('accessToken') accessToken: string) {
        try {
            const user = this.decryptAccesstokenService.getUserFromAccessToken(accessToken);
            return { user };
        } catch (error) {
            return { error: 'Invalid Access Token' };
        }
    }
}
