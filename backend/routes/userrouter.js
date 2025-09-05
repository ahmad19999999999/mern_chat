import express from "express";
import{register,LoginUser,Logout,UpdateUser,getUserdatails} from '../controler/usercontroller.js'
import {verifyUserAuth} from '../midelware/userAuth.js'
const router = express.Router();

router.post('/register',register)
router.post('/login',LoginUser)
router.post('/logout',Logout)
router.put('/update',verifyUserAuth,UpdateUser)
router.route('/profile').get(verifyUserAuth,getUserdatails)

export default router;