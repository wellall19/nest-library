import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
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
            }))
        )
    }
}