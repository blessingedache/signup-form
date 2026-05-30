import User from '../models/userModel.js';   
import file from '../models/imageModel.js';      // ✅ renamed from imageModel → file
import bcrypt from 'bcryptjs';
import Student from '../models/studentmodel.js';
import { sendEmail } from '../middlewares/email.js';
import jwt from 'jsonwebtoken';

export const registerStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, userName, password } = req.body;

        if (!firstName || !lastName || !email || !userName || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newStudent = await Student.create({
            firstName, lastName, email, userName, password
        });

        await sendEmail({
            to: newStudent.email,
            subject: "Welcome to our platform",
            html: `<h1>Dear ${newStudent.firstName},</h1>
                   <p>Thank you for registering. We are excited to have you!</p>
                   <p>Best regards,<br/>The Team</p>`
        });

        res.status(201).json({ message: 'Student registered successfully', student: newStudent });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const alldata = await Student.find();
        res.status(200).json({ message: "all data fetched", alldata });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Search in Student collection, not User
        const user = await Student.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRETPIN,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
            },
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};


export const allusers = async (req, res) => {
    try {
        const getalluser = await User.find();  //populate all users from User collection
        res.status(200).json({ message: "all users fetched", getalluser });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};



//image upload controller

export const postMedia = async (req, res) => {
    try{
       
        //check if the files exists
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No image uploaded" });
        }
        //get the images
         const image = req.files.image;

         //allowed image/file types
         const allowedTypes = [
            "image/jpeg", 
            "image/png", 
            "image/jpg",
        ];

        //validate file types
        if(!allowedTypes.includes(image.mimetype)) {
            return res.status(400).json({ message: "Invalid file type. Only JPEG, PNG, and JPG are allowed." });
        }

        //create a unique name for our media assets
        const filename = `${Date.now()}-${image.name}`;

        //file path to store the image
        const uploadFilePath = `./uploads/${filename}`;

        //move image to the folder
        await image.mv(uploadFilePath);

        //save image info to database
        const savedImage = await file.create({
            filename: filename,
            path: uploadFilePath,
            mimetype: image.mimetype
        });

        return res.status(201).json({ 
            success: true,
            message: "Image uploaded successfully", image: savedImage });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
    }
