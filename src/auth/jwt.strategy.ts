import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.serviсe";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor( 
        private authService: AuthService,
        ConfigService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ConfigService.getOrThrow<string>('JWT_SECRET')
        }
        )
    }
    async validate(payload: any) {
        return {
            id: payload.id,
            email: payload.email,
            firstName: payload.firstName,
        };
}
}