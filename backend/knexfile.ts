import type { Knex } from "knex"

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql'

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "pg",
		connection: {
			database: "phone-book",
			user: "phone",
			password: "asdfasdf",
			port: 6432,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
	production: {
		client: 'pg',
		connection: {
			host: process.env.DATABASE_URL,
		},
		pool: { min: 2, max: 10 },
		migrations: {
			tableName: "knex_migrations",
		},
	},
}

module.exports = config
