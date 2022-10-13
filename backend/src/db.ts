import knex from 'knex'
import type { Knex } from "knex"
import * as config from '../knexfile'

const quoteAppConfig = (config as { [key: string]: Knex.Config })[process.env.KNEX_ENV as string]
if (!quoteAppConfig) {
	throw new Error(
		"Could not configure knex for quote app database. Check the KNEX_ENV environment variable, which is currently set to "
		+ process.env.KNEX_ENV)
}

const quoteApp = knex(quoteAppConfig)

export {quoteApp as knex}
