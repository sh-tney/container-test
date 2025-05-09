import * as express from "express";
import type { Express, Request, Response } from "express";
import { ConsoleLogger } from "./logger";

export const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	const logger = new ConsoleLogger();
	logger.info('here');

	res.send(`Hello World ${req.ip}`);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
