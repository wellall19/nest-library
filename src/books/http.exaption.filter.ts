import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        
        const code = exception.getStatus();
        
        const res = exception.getResponse();
        const data = typeof res === 'string' ? res : (res as any).message;

        response.status(code).json({
                timestamp: new Date().toISOString(),
                statusCode: 'fail',
                data,
                code, 
            });
    }
}
