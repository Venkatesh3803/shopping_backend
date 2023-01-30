import express from "express"
import { createPost, deletePost, getAllAdminPosts, getAllPosts, getSingleProduct, updatePost } from "../controllers/postController.js"

const router = express.Router()

router.post("/create", createPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.get("/admin", getAllAdminPosts)
router.get("/", getAllPosts)
router.get("/single/:id", getSingleProduct)

export default router