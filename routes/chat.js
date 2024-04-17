const express=require('express');
const chatController=require('../controllers/chat');

const router=express.Router();

router.post('/postChat',chatController.postChat);
router.get('/getChat',chatController.getChat);

module.exports=router;