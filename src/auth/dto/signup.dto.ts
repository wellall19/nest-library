import { IsDefined, IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";


export class SignUpDto {
    @IsEmail()
    @IsDefined()
    public readonly email: string; 

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @MinLength(4)
    public readonly password: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public readonly firstName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public readonly lastName: string;

}