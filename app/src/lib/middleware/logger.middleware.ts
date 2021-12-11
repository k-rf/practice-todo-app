import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger("HTTP");

    logger.log(`${req.method} ${req.originalUrl}`);

    next();
};
