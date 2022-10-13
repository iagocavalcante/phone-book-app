const DEFAULT_LEVEL = process.env.LOG_LEVEL || 'debug'
const PRETTY_LOGS = !!process.env.PRETTY_LOGS

const availableLevels = ['debug', 'info', 'warning', 'error']
const log = (level: string, message: string, metadata?: Record<string, unknown>) => {
	if (availableLevels.indexOf(level) < availableLevels.indexOf(logger.level)) {
		return
	}
	const outputObject = {
		level,
		message,
		...metadata,
	}
	let output = ''
	if (PRETTY_LOGS) {
		output = JSON.stringify(outputObject, null, 2)
	} else {
		output = JSON.stringify(outputObject)
	}
	// eslint-disable-next-line no-console
	console.log(output)
}

const setLevel = (level: string) => {
	if (availableLevels.indexOf(level) == -1) {
		throw new Error('Invalid log level passed: ' + level + " does not exist")
	}
	logger.level = level
}

const logger = {
	level: DEFAULT_LEVEL,
	log,
	setLevel,
} as {
	level: string
	log: (level: string, message: string, metadata?: unknown) => void
	setLevel: (level: string) => void
	debug: (message: string, metadata?: unknown) => void
	info: (message: string, metadata?: unknown) => void
	warning: (message: string, metadata?: unknown) => void
	error: (message: string, metadata?: unknown) => void
}

// Note: make convience methods so we can do logger.info(...), logger.error(...), etc
availableLevels.forEach(level => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore:next-line
	logger[level] = (...args) => log(level, ...args)
})

export {logger}
