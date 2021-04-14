const isAuth = require('./../middlewares/is-auth');
const express = require('express');
const router = express.Router();
const { getUser, getUserPosts, getUserPost } = require('./../controllers/user');

router.get('/:username', getUser);
router.get('/:username/posts', getUserPosts);
router.get('/:username/posts/:slug', isAuth, getUserPost);

module.exports = router;