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

router.get('/api/post/:id', getPost);
router.delete('/api/post/:id', authMiddleware, deletePost);
router.post('/api/post', authMiddleware, addPost);
router.put('/api/post/:id', authMiddleware, editPost);


module.exports = router;