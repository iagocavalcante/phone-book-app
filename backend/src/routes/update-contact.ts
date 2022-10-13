import { Request, Response } from 'express'
import { contactQueries } from '../queries/contacts'
import { wrapRoute500OnException } from "../helpers"

const updateContact = wrapRoute500OnException(async (req: Request, res: Response) => {
	const { id } = req.params
	const { firstName, lastName, phoneNumber } = req.body
	if (!id) {
		res.status(400).send({ message: 'id is required' })
		return
	}
	const contact = await contactQueries.updateContact(Number(id), {
		firstName,
		lastName,
		phoneNumber,
	})
	res.json(contact)
	// Update hubspot deal in the background
})

export {updateContact}
