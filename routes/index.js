const express = require('express');
const router = express.Router();
const passport = require('passport');

console.log('Router is started...');

const homeController = require('../controller');
const userController = require('../controller/user_controller');

router.get('/',homeController.home);

router.use('/posts',require('./post'));
router.use('/comment',require('./comment.js'));


router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.get('/user',userController.user);
router.get('/userSignin',userController.userSignin);
router.post('/user/create',userController.create);
router.get('/userSignout',userController.destroySession);
//use passport as middleware to authenticate
router.post('/user/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/userSignin'}
),userController.createSession);

router.post('/update/:id',passport.checkAuthentication,userController.update);


module.exports = router;