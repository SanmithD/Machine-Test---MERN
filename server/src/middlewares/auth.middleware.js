import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import { Response } from '../utils/response.util.js';

export const protectRoute = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token) return Response(403, false, 'Unauthorized', res);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return Response(400, false, 'Invalid token', res);

        const user = await userModel.findById(decoded.userId).select("-password");
        if(!user) return Response(404, false, 'Not found', res);

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return Response(500, false, 'Server error', res)
    }
}