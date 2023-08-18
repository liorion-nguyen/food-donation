import {
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/jwt.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        if(req.user.user.status) {
            return req.user;
        }
        else {
            return false;
        }
    }
}