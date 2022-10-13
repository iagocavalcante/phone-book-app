import { Request, Response } from 'express'
import { contactQueries } from '../queries/contacts'
import { wrapRoute500OnException } from "../helpers"

const listContacts = wrapRoute500OnException(async (req: Request, res: Response) => {
	const contacts = await contactQueries.listContacts()
  res.json(contacts)
	// Update hubspot deal in the background
})

export {listContacts}
