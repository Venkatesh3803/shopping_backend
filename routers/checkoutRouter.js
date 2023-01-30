import express from "express"
import { checkOut } from "../controllers/checkout.js"

const router = express.Router()

router.post("/payment", checkOut)

export default router