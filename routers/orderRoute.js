import express from "express"
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, UpdateOrder } from "../controllers/orderController.js"

const router = express.Router()
router.post("/create", createOrder)
router.put("/:id", UpdateOrder)
router.delete("/:id", deleteOrder)
router.get("/orders", getAllOrders)
router.get("/single/:id", getSingleOrder)

export default router