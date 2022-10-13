import type { Knex } from 'knex'

import { knex } from '../db'
import { logger } from '../logger'

const contactKeyToColumnNameMap = {
	id: 'id',
	phoneNumber: 'phone_number',
	firstName: 'first_name',
	lastName: 'last_name',
}

export type Contact = {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
}

const contactColumnNameToKeyMap = Object.fromEntries(Object
	.entries(contactKeyToColumnNameMap).map(([k,v]) => [v,k]))

const mapContactByToOperation = (contactBy: Partial<Contact> | Partial<Nullable<Contact>>, aliasName: string | null = null) => {
	const operation = {} as Record<string, number | string>
	for (const key of Object.keys(contactBy)) {
		const columnName = contactKeyToColumnNameMap[key as keyof typeof contactKeyToColumnNameMap] as string
		if (!columnName) {
			logger.error("Unknown column for contact key: " + key, {
				contactBy,
			})
			continue
		}
		if (aliasName) {
			operation[`${aliasName}.${columnName}`] = contactBy[key as keyof Contact] as string | number
			continue
		}
		operation[columnName] = contactBy[key as keyof Contact] as string | number
	}
	return operation
}

const selectColumns = (aliasName: string) => ({...Object.values(contactKeyToColumnNameMap).map(columnName => `${aliasName}.${columnName}`)})

const contactQueries = {
	queryContact: async (contactBy: Partial<Contact>, txn?: typeof knex): Promise<Contact | null> => {
		let query = (txn || knex) as Knex
		const result = await query.from({'c': 'contacts'})
			.where(mapContactByToOperation(contactBy, 'c'))
			.select('*')
			.first()

		if (!result) {
			return null
		}
		const contactRow = result
		const contact = {} as Contact
		for (const columnName of Object.keys(contactColumnNameToKeyMap)) {
			const contactKey = contactColumnNameToKeyMap[columnName] as keyof Contact
			const contactValue = contactRow[columnName]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(contact[contactKey] as any) = contactValue
		}
		return contact
	},
	queryContactBy: async (contactBy: Partial<Contact>, txn?: typeof knex): Promise<Contact | null> => {
		let query = (txn || knex) as Knex
		const result = await query.from({'c': 'contacts'})
			.where(mapContactByToOperation(contactBy, 'c'))
			.select(selectColumns('c'))
			.first()

		if (!result) {
			return null
		}
		const contactRow = result
		const contact = {} as Contact
		for (const columnName of Object.keys(contactColumnNameToKeyMap)) {
			const contactKey = contactColumnNameToKeyMap[columnName] as keyof Contact
			const contactValue = contactRow[columnName]
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(contact[contactKey] as any) = contactValue
		}
		return contact
	},
	updateContact: async (contactId: number, contact: Partial<Nullable<Contact>>, txn?: typeof knex): Promise<void> => {
		await (txn || knex)('contacts')
			.update(mapContactByToOperation(contact))
			.where({
				id: contactId,
			})
	},
  deleteContact: async (contactId: number, txn?: typeof knex): Promise<void> => {
    await (txn || knex)('contacts')
      .delete()
      .where({
        id: contactId,
      })
  },
	insertContact: async (contact: Partial<Contact>, txn?: typeof knex): Promise<number> => {
		const results = await (txn || knex)('contacts')
			.insert(mapContactByToOperation(contact))
			.returning('id')
		return results[0].id
	},
	listContacts: async (txn?: typeof knex): Promise<Contact[]> => {
		let query = (txn || knex) as Knex

		const results = await query.from({'c': 'contacts'})
		const contacts = [] as Contact[]
		for (const contactRow of results) {
			const contact = {} as Contact
			for (const columnName of Object.keys(contactColumnNameToKeyMap)) {
				const contactKey = contactColumnNameToKeyMap[columnName] as keyof Contact
				const contactValue = contactRow[columnName]
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				;(contact[contactKey] as any) = contactValue
			}
			contacts.push(contact)
		}
		return contacts
	},
}

export {contactQueries}
