import User from "../models/usermodel.js";
import HandeAsyncError from '../midelware/HandeAsyncError.js';
import ErrorHandler from '../utils/Errorhandel.js';
import sendToken from '../utils/token.js';

export const register = HandeAsyncError(async (req, res, next) => {
    const { fullName, email, password } = req.body;

    const user = await User.create({ fullName, email, password });

    if (!user) {
        return next(new ErrorHandler(400, "User not created"));
    }

    sendToken(user, 201, res);
});

    
