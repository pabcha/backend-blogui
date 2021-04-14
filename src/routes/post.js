const { getPosts, getPost, storePost } = require('./../controllers/post');
const isAuth = require('./../middlewares/is-auth');
const express = require('express');
const router = express.Router();

router.get('/', getPosts);
router.post('/', isAuth, storePost);
router.get('/:slug', getPost);

module.exports = router;