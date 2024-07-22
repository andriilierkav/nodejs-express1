const Post = require("../models/post");
const Logger = require('../log');
const logger = new Logger();

const handleErrors = (error, res) => {
    logger.log(error);
    res.status(500).json(error.message);
}
const getPost = (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.status(200).json(post);
    }).catch((error) => handleErrors(error, res));
};

const getPosts = (req, res) => {
    Post.find()
        .select({ title: 1, _id: 1 })
        .sort({ date: 'desc' })
        .then(posts => {
            res.status(200).json(posts);
        }).catch((error) => handleErrors(error, res));
};
const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json(req.params.id);
        }).catch((error) => handleErrors(error, res));
}

const editPost = (req, res) => {
    const {title, content} = req.body;
    Post.findByIdAndUpdate(req.params.id, {title, content}, {new: true})
        .then(post => {
            res.status(200).json(post);
        }).catch((error) => handleErrors(error, res));
}

const addPost = (req, res) => {
    const {title, content} = req.body;
    const author = 'Api Admin';
    const post = new Post({
        title,
        content,
        author,
    });
    post.save()
        .then((post) => {
            res.status(200).json(post);
        }).catch((error) => handleErrors(error, res));
};

module.exports = { getPost, getPosts, deletePost, editPost, addPost };