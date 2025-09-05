import express from "express";
import{getUsersForSidebar,getMessages,sendMessage} from '../controler/messagecontroller.js'
import {verifyUserAuth} from '../midelware/userAuth.js'
const router = express.Router();

router.get("/messages/users", verifyUserAuth, getUsersForSidebar);
router.get("/messages/:id", verifyUserAuth, getMessages);

router.post("/messages/send/:id", verifyUserAuth, sendMessage);


export default router;