import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export default function loggerMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction,
): void {
	logger.runWithAsyncContext(next, {
		traceId: randomUUID(),
		entryPoint: req.url,
	});
}
