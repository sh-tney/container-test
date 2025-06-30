import { randomUUID } from "node:crypto";
import type { Express, Request, Response } from "express";
import * as express from "express";
import { ConsoleLogger } from "./logger";
import { anotherMiddleware } from "./middleware/anotherMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { logMiddleware } from "./middleware/logMiddleware";

export const app: Express = express();

app.use(logMiddleware);

app.use(anotherMiddleware);

app.get("/", async (_req: Request, _res: Response) => {
	const logger = ConsoleLogger.getInstance();

	const traceId = randomUUID();
	logger.info(`start`, { position: "start", a: 1 });

	logger.addContext({ traceId });

	logger.info("here", { position: "here", b: 2 });

	await new Promise((resolve) => setTimeout(resolve, 5000));

	logger.info(`almost done`, { position: "done", c: 3 });

	throw new Error(`something bad happened`);

	//res.send(`Hello World ${req.ip}`);
});

// Any uncaught Errors from earlier middleware/routes will flow here
app.use(errorMiddleware);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
