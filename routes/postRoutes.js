const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const { createPost, deletePost, getAllPost, updatePost } = require('../controllers/postControllers');

router.route('/post/create').post(isLoggedIn, createPost)
router.route('/post/update/:id').post(isLoggedIn, updatePost)
router.route('/post/delete/:id').post(isLoggedIn, deletePost)
router.route('/post/get').get(getAllPost)

module.exports = router