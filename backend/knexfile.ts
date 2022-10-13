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
			host: `${dbSocketPath}/billy-leads-app:us-central1:quotes`,
			port: Number(process.env.PGPORT),
			user: process.env.PGUSER,
			database: process.env.PGDATABASE,
			password: process.env.PGPASSWORD,
		},
		pool: { min: 2, max: 10 },
		migrations: {
			tableName: "knex_migrations",
		},
	},
	// Note: environment used to migration prod from within github action job
	migrate: {
		client: 'pg',
		connection: {
			host: 'localhost',
			port: 6434,
			user: 'postgres',
			database: 'postgres',
			password: process.env.PGPASSWORD,
		},
		pool: { min: 2, max: 10 },
		migrations: {
			tableName: "knex_migrations",
		},
	},
}

module.exports = config
