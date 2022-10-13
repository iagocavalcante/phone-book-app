import type { Request, Response, NextFunction} from 'express'
import { logger } from './logger'

type ExpressHandler = (req: Request, res: Response, next?: NextFunction) => Promise<unknown>

const wrapRoute500OnException = (expressHandler: ExpressHandler): ExpressHandler => {
	return async (req: Request, res: Response, next?: NextFunction) => {
		try {
			await expressHandler(req, res, next)
		} catch (e) {
			const err = (e as unknown as Error)
			let externalResponseData
			logger.error('Uncaught error, responding with 500 for url ' + req.url + ': ' + err.message, {
				stack: err.stack,
				e: e,
				typeofE: typeof e,
				externalResponseData,
			})
			if(!res.headersSent) {
				res.status(500).json({
					error: 'Internal server error',
				})
			}
		}
	}
}

export {
	wrapRoute500OnException,
}
