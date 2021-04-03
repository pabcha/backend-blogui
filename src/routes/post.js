const express = require('express');
const router = express.Router();
const { getPosts, getPost} = require('./../controllers/post');

router.get('/', getPosts);
router.get('/:slug', getPost);

module.exports = router;