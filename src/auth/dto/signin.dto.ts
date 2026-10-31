import { IsDefined, IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";


export class SignInDto {
    @IsEmail()
    @IsDefined()
    public readonly email: string; 

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @MinLength(4)
    public readonly password: string;
}