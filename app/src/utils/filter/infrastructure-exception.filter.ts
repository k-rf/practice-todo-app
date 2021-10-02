import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { InfrastructureException } from "utils/exception/infrastructure.exception";

@Catch(InfrastructureException)
export class InfrastructureExceptionFilter implements ExceptionFilter {
    catch(exception: InfrastructureException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(500).json({
            statusCode: 500,
            error: exception.name,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
