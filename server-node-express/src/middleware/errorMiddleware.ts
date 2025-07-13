import type { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export default function errorMiddleware(
	error: Error,
	_req: Request,
	res: Response,
	next: NextFunction,
): void {
	logger.error(`Uncaught Error: ${error.message}`, { error });

	if (!res.headersSent) res.send().status(500);

	next();
}
