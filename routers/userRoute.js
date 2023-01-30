import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js"

const router = express.Router()
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/users/:id", getAllUsers)


export default router