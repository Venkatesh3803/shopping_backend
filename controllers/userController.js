import UserModel from "../models/user.js";

// get user
export const getUser = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)

    try {
        if (user) {
            const currentUser = await UserModel.findOne(user)
            const { password, isAdmin, ...others } = currentUser._doc
            res.status(200).json(others)
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}


// update user
export const updateUser = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)

    try {
        if (user) {
            const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(updatedUser)
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}

// delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)

    try {
        if (user) {
            await UserModel.findByIdAndDelete(user)
            res.status(200).json("user deleted Sucessfully")
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}

// get all users 

export const getAllUsers = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    try {
        if (user.isAdmin) {
            const currentUser = await UserModel.find()
            res.status(200).json(currentUser)
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}