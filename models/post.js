import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    ]
    ,
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    size: {
        type: Array,
    },

    category: {
        type: String
    },
    fabric: {
        type: String
    },
    quantity: {
        type: String
    },
    color: {
        type: String
    },
    reviews: {
        type: [{
            username: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }],
    },
    gender: {
        type: String,
        required: true
    }

}, { timestamps: true })

const postModel = mongoose.model('posts', postSchema);
export default postModel