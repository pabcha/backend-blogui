const express = require('express');
const router = express.Router();
const { getUser, getUserPosts } = require('./../controllers/user');

router.get('/:username', getUser);
router.get('/:username/posts', getUserPosts);

module.exports = router;