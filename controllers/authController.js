import UserModel from "../models/user.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";

// register
export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashPass
    const newUser = UserModel(req.body)
    const { username } = req.body;

    try {
        const oldUser = await UserModel.findOne({ username });
        if (oldUser) {
            res.status(401).json({ message: "this username is already exits" })
        }
        const user = await newUser.save();
        const token = Jwt.sign({
            username: user.username,
        }, process.env.JWT_KEY, { expiresIn: "1h" })
        res.status(200).json({message: "Registered Sucessfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//login

export const loginUser = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    try {

        if (user) {
            const validity = await bcrypt.compare(req.body.password, user.password);
            if (!validity) {
                res.status(404).json({message:"invalid Credentials"})
            } else {
                const loginUser = await UserModel.findOne(user)
                const token = Jwt.sign({
                    email: req.body.email,
                }, process.env.JWT_KEY, { expiresIn: "1d" })
                const { password, ...others } = loginUser._doc
                res.status(200).json({message :"Login Sucessfull", others, token })
            }
        } else {
            res.status(500).json({message :"user doesnot exist"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}