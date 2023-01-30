import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    products: {
        type: []
    },
    
    address: {
        fullname: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        deliveryAddress: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pincode: {
            type: String
        },
        district: {
            type: String
        },
    },

    totalAmount: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
}, { timestamps: true }
)

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel
