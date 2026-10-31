import { IsString, IsNotEmpty,  IsOptional } from "class-validator";


export class UpdateBookDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly title?: string; 

    @IsString()
    @IsOptional()
    public readonly description?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly authors?: string;

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