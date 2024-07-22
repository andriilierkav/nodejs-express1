const express = require('express');
const router = express.Router();

const postController = require('../controllers/post-controller');
const PostController = new postController();

router.get('/post/:id', PostController.getPost);
router.get('/deletePost/:id', PostController.deletePost);
router.get('/posts', PostController.getPosts);
router.get('/add-post', PostController.addPost);
router.get('/editPost/:id', PostController.editPost);
router.post('/add-post', PostController.addPostPost);

module.exports = router;