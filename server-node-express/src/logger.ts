import { AsyncLocalStorage } from "node:async_hooks";

export interface ILogger {
	// Identifiers
	addGlobalContext(context: LoggerContext): void;

	// Standard Log Functions
	debug(message: string, context?: LoggerContext): void;
	info(message: string, context?: LoggerContext): void;
	warn(message: string, context?: LoggerContext): void;
	error(message: string, context?: LoggerContext): void;
}

export type LoggerContext = {
	traceId?: string;
	userId?: string;
} & { [key: string]: any };

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
const LOG_OUTPUTS: Record<LogLevel, (message?: any, ...optionalParams: any[]) => void> = {
	DEBUG: console.debug,
	INFO: console.info,
	WARN: console.warn,
	ERROR: console.error
}

export class ConsoleLogger implements ILogger {
	private static instance: ConsoleLogger;


	private globalContext: LoggerContext = {};
	public asyncContext: AsyncLocalStorage<LoggerContext> = new AsyncLocalStorage();

	public get context(): LoggerContext {
		return {
			...this.globalContext,
			...this.asyncContext.getStore()
		}
	}

	public static getInstance(): ConsoleLogger {
		if (!ConsoleLogger.instance) {
			ConsoleLogger.instance = new ConsoleLogger();
		}

		return ConsoleLogger.instance;
	}

	public addGlobalContext(context: LoggerContext): void {
		this.globalContext = {
			...this.globalContext,
			...context,
		};
	}

	public runWithLoggingContext<T>(context: LoggerContext, fn: () => T): T {
		return this.asyncContext.run(context, fn);
	}

	public addContext(context: LoggerContext): void {
		const store = this.asyncContext.getStore();
		if (!store);
		console.log(`added ${context.traceId}`);
		store.traceId = context.traceId;
	}


	public debug(message: string, context?: LoggerContext): void {
		this.log('DEBUG', message, context);
	}

	public info(message: string, context?: LoggerContext): void {
		this.log('INFO', message, context);
	}

	public warn(message: string, context?: LoggerContext): void {
		this.log('WARN', message, context);
	}

	public error(message: string, context?: LoggerContext): void {
		this.log('ERROR', message, context);
	}

	private log(level: LogLevel, message: string, context?: LoggerContext): void {
		LOG_OUTPUTS[level](`${level}: "${message}"`, { ...this.context, ...context });
	}
}
