import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import authRouter from "./routers/authRouter.js"
import userRoute from "./routers/userRoute.js"
import postRoute from "./routers/postRouter.js"
import orderRouter from "./routers/orderRoute.js"
import checkoutRouter from "./routers/checkoutRouter.js"
import cors from "cors"

const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors())
dotenv.config()

const port = process.env.PORT
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`connected to mongoDb at ${port}`))
    .catch((error) => console.log(error))

app.listen(port, () => console.log(`post listen at ${port}`))

// using routes


app.use("/api/auth", authRouter)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/order", orderRouter)
app.use("/api/checkout", checkoutRouter)