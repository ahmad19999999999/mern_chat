import Message from '../models/messagemodel.js';
import User from "../models/usermodel.js";
import HandeAsyncError from '../midelware/HandeAsyncError.js';
import cloudinary from '../utils/Clodinary.js';
import { getReceiverSocketId, io } from "../utils/socket.js";


export const getUsersForSidebar = HandeAsyncError(async (req, res, next) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

  res.status(200).json({
    success: true,
    users: filteredUsers,
  });
});

// جلب الرسائل بين المستخدمين
export const getMessages = HandeAsyncError(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json({
    success: true,
    messages,
  });
});

// إرسال رسالة
export const sendMessage = HandeAsyncError(async (req, res, next) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user.id;


  let imageUrl;
  if (image) {
    // رفع الصورة إلى Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({
    success: true,
    message: newMessage,
  });
});