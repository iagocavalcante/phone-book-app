import express from "express"
import cookieParser from "cookie-parser"
import { logger } from "./logger"
import { createContact } from "./routes/create-contact"
import { listContacts } from "./routes/list-contacts"
import { updateContact } from "./routes/update-contact"
import { deleteContact } from "./routes/delete-contact"
import { getContact } from "./routes/get-contact"

const PORT = process.env.PORT || 3001

const app = express()

const FRONTEND_BASE = process.env.FRONTEND_BASE

app.use((req, res, next) => {
	// Caching
	res.set("Cache-Control", "max-age=0, no-store")
	// CORS
	res.set("Access-Control-Allow-Origin", FRONTEND_BASE)
	res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
	res.set("Access-Control-Allow-Headers", "content-type, authorization")
	res.set("Access-Control-Expose-Headers", "x-new-google-jwt")
	res.set("Access-Control-Max-Age", "300")

	if (req.method == "OPTIONS") {
		return res.end()
	}
	next()
})

if (process.env.SERVE_STATIC) {
	app.use(express.static("public"))
}

app.use(cookieParser())
app.use(express.json())

app.post("/api/contacts", createContact)
app.get("/api/contacts", listContacts)
app.get("/api/contacts/:id", getContact)
app.put("/api/contacts/:id", updateContact)
app.delete("/api/contacts/:id", deleteContact)

app.listen(PORT, () => {
	logger.info(`Listening on ${PORT}`)
})
