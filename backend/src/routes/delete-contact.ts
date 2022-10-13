import { Request, Response } from 'express'
import { contactQueries } from '../queries/contacts'
import { wrapRoute500OnException } from "../helpers"

const deleteContact = wrapRoute500OnException(async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    res.status(400).send({ message: 'id is required' })
    return
  }
	const contact = await contactQueries.deleteContact(Number(id))
  res.json(contact)
	// Update hubspot deal in the background
})

export {deleteContact}
