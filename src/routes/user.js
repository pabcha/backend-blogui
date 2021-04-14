const isAuth = require('./../middlewares/is-auth');
const express = require('express');
const router = express.Router();
const { getUser, getUserPosts, getUserPost, deleteUserPost } = require('./../controllers/user');

router.get('/:username', getUser);
router.get('/:username/posts', getUserPosts);
router.get('/:username/posts/:slug', isAuth, getUserPost);
router.delete('/:username/posts/:slug', isAuth, deleteUserPost);

module.exports = router;