import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private id: number;

    constructor() {
        this.id = 0;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const id = ++this.id;

        const logger = new Logger("HttpInterceptor");
        const begin = new Date().valueOf();
        const request = context.switchToHttp().getRequest<Request>();
        const info = `${request.method} ${request.originalUrl}`;

        logger.log(`${id} ${info}`);

        return next.handle().pipe(
            tap(() => {
                const elapsed = new Date().valueOf() - begin;
                logger.log(`${id} elapsed ${elapsed}ms`);
            }),
        );
    }
}
