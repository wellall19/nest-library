import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import { ValidatedUser } from "../users/interfaces/user.validated";

@Injectable()
export class AuthService{
    constructor(private userService: UsersService,  private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<ValidatedUser> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user.toObject();
        return result;
    }

    async signup(data: SignUpDto){
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userService.create({
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
        });
        return this.createToken(user.toObject());
    }

    async signin(data: SignInDto){
        const user = await this.validateUser(data.email, data.password);
        return this.createToken(user);
    }

    private createToken(user: ValidatedUser){
        const payload = {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
        }
        return { access_token: this.jwtService.sign(payload) };
    }
}
