const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controller/comment_controller.js');

router.post('/create-comment',passport.checkAuthentication,commentController.createComment);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroyComment);

module.exports = router;