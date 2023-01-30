import postModel from "../models/post.js"
import cloudinary from "../utiles/cloudinary.js"


// create post
export const createPost = async (req, res) => {
    try {
        let image = [...req.body.image]
        let imageBuffer = []
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(image[i], {
                folder: "post",
            })
            imageBuffer.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.image = imageBuffer
        const post = await postModel.create(req.body)
        return res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// updating post
export const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id);
    try {
        if (post) {
            const currentPost = await postModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(currentPost);
        } else {
            res.status(404).json("post does not exist")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// deleting post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const post = await postModel.findById(id);
    try {
        if (post) {
            await postModel.findByIdAndDelete(post)
            res.status(200).json("deleted sucessfull");
        } else {
            res.status(404).json("post does not exist")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// getAllPosts
export const getAllPosts = async (req, res) => {
    let qCategory = req.query.category
    let qGender = req.query.gender

    try {
        let product
        if (qCategory) {
            product = await postModel.find({ category: qCategory })
        } else if (qGender) {
            product = await postModel.find({ gender: qGender })
        } else {
            product = await postModel.find()
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get all posts
export const getAllAdminPosts = async (req, res) => {
    try {
        const post = await postModel.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get single post
export const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    let post = await postModel.findById(id);
    try {
        if (post) {
            const currentPost = await postModel.findById(post)
            await res.status(200).json(currentPost)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}