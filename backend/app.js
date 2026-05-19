// Add at the very top of server.js
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err.message);
    console.error(err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
    process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import express from 'express';
import mongoose from 'mongoose';
import studentRoutes from "./src/routers/studentRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Connect to database
async function connectingDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error.message); 
    }
}
connectingDatabase();

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors()); //allows you to acess your backend from your frontend without any error of cors policy 


//end point for home
app.get("/home", (req, res) => {
    res.status(200).json({message:"welcome home"})
})

// Routes
app.use("/api/v1", studentRoutes);
app.use('/api/v1/auth', studentRoutes);


app.listen(4000, () => {
    console.log("server is running on port 4000");
});


//json web token is a package that allows you to create and verify tokens for authentication and authorization in your application. It is commonly used in web applications to 
// manage user sessions and secure API endpoints. 
// With JWT, you can generate a token that contains 
// user information and send it to the client after successful login. The client can then include this token in subsequent requests to access protected resources, and the server can verify the token to ensure the user is authenticated.

//cookie-parser is a package that allows you to parse and manage 
// cookies in your Node.js applications. It provides a simple
//  API to read, write, and manipulate cookies in HTTP requests 
// and responses. With cookie-parser, you can easily handle 
// cookie data, set cookie attributes (such as expiration, path, 
// and domain), and retrieve cookie values from incoming requests. This is particularly useful for managing user sessions, storing preferences, and implementing authentication mechanisms in web applications.