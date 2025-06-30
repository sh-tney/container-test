import type { NextFunction, Request, Response } from "express";
import { ConsoleLogger } from "../logger";

export function anotherMiddleware(
	_req: Request,
	_res: Response,
	next: NextFunction,
): void {
	const logger = ConsoleLogger.getInstance();
	logger.debug(`another middelware here`);
	next();
}
