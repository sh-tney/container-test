import type { Express, Request, Response } from "express";
import express from "express";
import errorMiddleware from "./middleware/errorMiddleware";
import loggerMiddleware from "./middleware/loggerMiddleware";
import logger from "./utils/logger";

export const app: Express = express();

app.use(loggerMiddleware);

app.get("/hello", async (req: Request, res: Response) => {
	logger.info(`Hello from ${req.ip}`);
	const msg = `✅`;
	res.send(msg).status(200);
	logger.info(`Responded ${msg}`);
});

app.get("/throws", async (req: Request, _res: Response) => {
	logger.info(`Hello from ${req.ip}`);

	throw new Error(`❌`);
});

app.use(errorMiddleware);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
