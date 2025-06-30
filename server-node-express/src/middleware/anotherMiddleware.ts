import { Request, Response, NextFunction } from 'express';
import { ConsoleLogger } from '../logger';

export function anotherMiddleware(req: Request, res: Response, next: NextFunction): void {
    const logger = ConsoleLogger.getInstance();
    logger.debug(`another middelware here`);
    next();
}