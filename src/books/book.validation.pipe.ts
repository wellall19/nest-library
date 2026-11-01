import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform{
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const messages = errors.flatMap((err) => 
                err.constraints ? Object.values(err.constraints) : [])
            throw new BadRequestException(
                messages.join(', ')
            );
        }
        return object;
    }
    private toValidate(metatype: Function): boolean{
        const types: Function[] = [String, Number, Boolean, Array, Object];
        return !types.includes(metatype);
    }
}