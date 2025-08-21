import bcrypt from 'bcrypt';
import { userModel } from "../models/user.model.js";
import { Response } from "../utils/response.util.js";
import { generateToken } from "../utils/utils.js";

export const signup = async(req, res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password) return Response(400, false, "All fields are required", res);

        const user = await userModel.findOne({ email }).select('-password');
        if(user) return Response(400, false, "User already exists", res);

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            email,
            password: hashPassword,
        });

        if(!newUser) return Response(400, false, "Invalid request", res);
        await newUser.save();

        const token = generateToken(newUser._id, res);

        Response(201, true, "User created", res, newUser, token );
    } catch (error) {
        console.log(error);
        return Response(500, false, "Server Error", res);
    }
}

export const login = async(req, res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password) return Response(400, false, "All fields are required", res);

        const user = await userModel.findOne({ email });
        if(!user) return Response(400, false, "User does not exists", res);

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) return Response(403, false, "Invalid credentials", res);

        const token = generateToken(user._id, res);
        
        Response(200, true, "User logged in", res, user, token );
    } catch (error) {
        console.log(error);
        return Response(500, false, "Server Error", res);
    }
}

export const profile = async(req, res) =>{
    try {
        const userId = req.user._id;
        if(!userId) return Response(403, false, "Unauthorized", res);

        const user = await userModel.findById(userId);
        if(!user) return Response(404, false, "not found", res);
        
        Response(200, true, "Profile", res, user);
    } catch (error) {
        console.log(error);
        return Response(500, false, "Server error", res);
    }
}