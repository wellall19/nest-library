import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor  implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next
        .handle()
        .pipe(
            map(data => ({
                status: 'success',
                data: data,
            })),
            catchError((err) => {
                const status = err instanceof HttpException ? err.getStatus() : 500;
                return throwError(() => new HttpException(
                    {status: 'fail', data: err.message},
                    status,
                ))
            })
        )   
    }
}