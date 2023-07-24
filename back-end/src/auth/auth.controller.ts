import {
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/jwt.guard';


@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return req.user;
    }
}