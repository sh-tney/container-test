import { randomUUID } from "node:crypto";

export interface ILogger {
	// Identifiers
	addContext(context: LoggerContext): void;

	// Standard Log Functions
	debug(message: string, context?: LoggerContext): void;
	info(message: string, context?: LoggerContext): void;
	warn(message: string, context?: LoggerContext): void;
	error(message: string, context?: LoggerContext): void;
}

export type LoggerContext = {
	traceId?: string;
	userId?: string;
};

export class ConsoleLogger implements ILogger {
	private context: LoggerContext = {};

	constructor(context: LoggerContext = {}) {
		this.context = {
			...context,
			traceId: context.traceId || randomUUID()
		};
	}

	public addContext(context: LoggerContext): void {
		this.context = {
			...this.context,
			...context,
		};
	}

	public debug(message: string, context?: LoggerContext): void {
		console.debug(`DEBUG: "${message}"`, { ...this.context, ...context });
	}

	public info(message: string, context?: LoggerContext): void {
		console.info(`INFO: "${message}"`, { ...this.context, ...context });
	}

	public warn(message: string, context?: LoggerContext): void {
		console.warn(`WARN: "${message}"`, { ...this.context, ...context });
	}

	public error(message: string, context?: LoggerContext): void {
		console.error(`ERROR: "${message}"`, { ...this.context, ...context });
	}
}
