const express = require('express');
const router = express.Router();

console.log('Router is started...');

const homeController = require('../controller');
const userController = require('../controller/user_controller');

router.get('/',homeController.home);
router.get('/user',userController.user);
router.get('/userSignin',userController.userSignin);
router.post('/user/create',userController.create);
router.post('/user/create-session',userController.createSession);
router.get('/profile',userController.profile);
router.get('/user/Signout',userController.signout);
module.exports = router;