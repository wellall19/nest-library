import { Post, Controller, Body, UseGuards, Req, Get } from '@nestjs/common';
import { SignUpDto } from "./dto/sugnup.dto";
import { AuthService } from './auth.servise'
import { SignInDto } from './dto/signin.dto'
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('api/users')
export class AuthController {
    constructor( private authService: AuthService ){}

    @Post('signup')
    signup(@Body() body: SignUpDto){
        return this.authService.signup(body);
    }

    @Post('signin')
    signin(@Body() body: SignInDto){
        return this.authService.signin(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: any){
        return req.user;
    }
}