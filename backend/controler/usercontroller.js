import User from "../models/usermodel.js";
import HandeAsyncError from '../midelware/HandeAsyncError.js';
import ErrorHandler from '../utils/Errorhandel.js';
import sendToken from '../utils/token.js';
import cloudinary from '../utils/Clodinary.js';


export const register = HandeAsyncError(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new ErrorHandler(400,'all failds are required'));
  }

  const user = await User.create({ fullName, email, password });

  sendToken(user, 201, res);
});


    
export const LoginUser=HandeAsyncError(async(req,res,next)=>{
    const {email,password}=req.body
    if(!email||!password){
        return next(new ErrorHandler(400,"email or password is empty"))
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler(401,"invalid email or password"))
    }
    const isPasswordMatched = await user.comparePassword(password);
if (!isPasswordMatched) {
    return next(new ErrorHandler(401,"invalid email or password"));
}

    sendToken(user,200,res);
})

export const Logout=HandeAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{expires:new Date (Date.now()),httpOnly: true})

    res.status(200).json({
        succuss:true,
        message:"succussflly logout"

    })
})


export const UpdateUser = HandeAsyncError(async (req, res, next) => {
  const { fullName, email,profilePic } = req.body;
  const updatedata = { fullName, email };

  if (profilePic && profilePic !== "") {
    const olduser = await User.findById(req.user.id);
    if (olduser.profilePic && olduser.profilePic.public_id) {
      await cloudinary.uploader.destroy(olduser.profilePic.public_id);
    }

    // رفع الصورة (avatar لازم تكون رابط أو base64 string صحيح)
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: 'profilePics',
      width: 150,
      crop: 'scale',
    });

    updatedata.profilePic = {
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updatedata, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user,
  });
});

export const getUserdatails=HandeAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
 res.status(200).json({
      success: true,
      user
    });
})