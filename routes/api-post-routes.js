const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewaree');
const {
    getPost,
    getPosts,
    deletePost,
    editPost,
    addPost
} = require('../controllers/api-post-controller');

router.get('/api/posts', getPosts);

router.get('/api/post/:id', authMiddleware, getPost);
router.delete('/api/post/:id', deletePost);
router.post('/api/post', addPost);
router.put('/api/post/:id', editPost);


module.exports = router;