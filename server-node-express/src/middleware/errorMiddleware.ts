import type { NextFunction, Request, Response } from "express";
import { ConsoleLogger } from "../logger";

export function errorMiddleware(
	error: Error,
	_req: Request,
	_res: Response,
	next: NextFunction,
): void {
	const logger = ConsoleLogger.getInstance();
	logger.error(`uh oh: ${error.message}`);
	next();
}
