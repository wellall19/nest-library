import { IsDefined, IsString, IsNotEmpty,  IsOptional } from "class-validator";


export class CreateBookDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public readonly title: string; 

    @IsString()
    @IsOptional()
    public readonly description?: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public readonly authors: string;

    @IsString()
    @IsOptional()
    public readonly favorite?: string;

    @IsString()
    @IsOptional()
    public readonly fileCover?: string;

    @IsString()
    @IsOptional()
    public readonly fileName?: string;
}