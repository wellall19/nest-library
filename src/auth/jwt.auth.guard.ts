import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext){
        return super.canActivate(context);
    }

    public handleRequest(err: any, user: any, info: any){
        if (err) {
            throw err;
        }
        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}