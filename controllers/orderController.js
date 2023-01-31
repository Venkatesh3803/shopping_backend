
import orderModel from "../models/order.js"


export const createOrder = async (req, res) => {
    const newOrder = orderModel(req.body);
    try {
        const order = await newOrder.save()
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get single order
export const getSingleOrder = async (req, res) => {
    const id = req.params.id;
    const post = await orderModel.findById(id)

    try {
        if (post) {
            const currentOrder = await orderModel(post)
            res.status(200).json(currentOrder)
        } else {
            res.status(404).json("Order not avaliable")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// updateOrder
export const UpdateOrder = async (req, res) => {
    const id = req.params.id
    const order = await orderModel.findById(id)
    const { userId } = req.body;

    try {
        if (order.userId === userId || req.body.isAdmin) {
            const currentOrder = await orderModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(currentOrder)
        } else {
            res.status(404).json("you cant update others order")
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete order
export const deleteOrder = async (req, res) => {
    const id = req.params.id
    const order = await orderModel.findById(id)
    const { userId } = req.body;

    try {
        if (order.userId === userId || req.isAdmin) {
            await orderModel.findByIdAndDelete(id)
            res.status(200).json("deleted sucessfilly")
        } else {
            res.status(404).json("you cant delete others order")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get Allorders
export const getAllOrders = async (req, res) => {
    const qUserId = req.query.userid
    try {
        let orders
        if (qUserId) {
            orders = await orderModel.find({ userId: qUserId });
        } else {
            orders = await orderModel.find()
        }
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}