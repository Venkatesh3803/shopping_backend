import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    image: {
        public_Id: {
            type: String
        },
        url: {
            type: String
        }
    }

}, { timestamps: true })

const UserModel = mongoose.model('user', UserSchema);
export default UserModel