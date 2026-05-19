import express from 'express';
import { 
    registerStudent, 
    getAllUser,   // ✅ use this for the /users route
    loginUser, 
    logoutUser 
} from '../controllers/studentcontroller.js';

import { authMiddleware } from "../middlewares/authorization.js";

const router = express.Router();

// Public routes
router.post('/register', registerStudent)
router.get('/register', getAllUser)

router.get("/users", authMiddleware, getAllUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;