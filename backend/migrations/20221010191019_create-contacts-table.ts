import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
	const tableName = 'contacts'
	await knex.raw(`
	CREATE FUNCTION last_upd_trigger_function() RETURNS trigger
	   LANGUAGE plpgsql AS
	$$BEGIN
	   NEW.updated_at := current_timestamp;
	   RETURN NEW;
	END;$$;
	`)
	await knex.schema.createTable(tableName, (table) => {
		table.increments()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.string('phone_number').notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
		table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
	})
	await knex.raw(`
	CREATE TRIGGER last_upd_trigger
	   BEFORE INSERT OR UPDATE ON ${tableName}
	   FOR EACH ROW
	   EXECUTE PROCEDURE last_upd_trigger_function();
	`)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function down(): Promise<void> {
  
}

