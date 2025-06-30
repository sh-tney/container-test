import { Request, Response, NextFunction } from 'express';
import { ConsoleLogger } from '../logger';

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void {
    const logger = ConsoleLogger.getInstance();
    logger.error(`uh oh: ${error.message}`);
    next();
}