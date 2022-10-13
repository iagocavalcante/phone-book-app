import { Request, Response } from 'express'
import { contactQueries } from '../queries/contacts'
import { wrapRoute500OnException } from "../helpers"

const createContact = wrapRoute500OnException(async (req: Request, res: Response) => {
	const { firstName, lastName, phoneNumber } = req.body
  if (!firstName || !lastName || !phoneNumber) {
    res.status(400).json({
      error: 'Missing required fields',
    })
  }
	const contact = await contactQueries.insertContact({
		firstName,
    lastName,
    phoneNumber,
	})
  res.json(contact)
	// Update hubspot deal in the background
})

export {createContact}
