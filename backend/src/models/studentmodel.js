 import express from 'express';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userName:{
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });


studentSchema.pre("save", async function (){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const Student = mongoose.model('Student', studentSchema);

export default Student;


// export default mongoose.model("User", userSchema);