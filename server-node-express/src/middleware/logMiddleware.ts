import type { NextFunction, Request, Response } from "express";
import { ConsoleLogger } from "../logger";

let counter = 0;

export function logMiddleware(
	_req: Request,
	_res: Response,
	next: NextFunction,
): void {
	const logger = ConsoleLogger.getInstance();
	counter++;
	logger.addGlobalContext({ globalCounter: counter });
	logger.debug(`middle`, { local: "middle" });
	logger.runWithLoggingContext(logger.context, next);
}
