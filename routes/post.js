const express = require('express');
const router = express.Router();
const passport = require('passport');
const posts = require('../controller/post_controller');

router.post('/post-create',passport.checkAuthentication,posts.createPost);
router.get('/destroy/:id',passport.checkAuthentication,posts.destroy);

module.exports = router;