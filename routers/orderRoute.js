import express from "express"
import { createOrder, deleteOrder, getAllOrders, UpdateOrder } from "../controllers/orderController.js"

const router = express.Router()
router.post("/create", createOrder)
router.put("/:id", UpdateOrder)
router.delete("/:id", deleteOrder)
router.get("/orders", getAllOrders)

export default router