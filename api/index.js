const Express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const roomRoute = require('./routes/rooms');
const hotelRoute = require('./routes/hotels');
const cookieParser = require('cookie-parser');
const app = Express();
dotenv.config();

// Mongodb Connection
connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Connected...');
    } catch (error) {
        throw error
    }
}


// middleware
app.use(cookieParser())
app.use(Express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/room", roomRoute);
app.use("/api/hotel", hotelRoute);

// Error Middleware
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        Success: false,
        Status: status,
        Message: message
    });
})

app.listen(8800, () => {
    connectDB();
    console.log("server is running at port 8800");
})