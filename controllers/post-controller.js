require('./abstract-controller');
const Post = require("../models/post");
const AbstractController = require("./abstract-controller");

class PostController extends AbstractController{
    getPost = (req, res) => {
        Post.findById(req.params.id).then(post => {
            const title = post.name;
            res.render(this.createPath('post'), {title, post});
        }).catch((error) => {
            this.logger.log(error);
        });
    };
    getPosts = (req, res) => {
        const title = 'Posts Page';
        Post.find()
            .sort({ date: 'desc' })
            .then(posts => {
                res.render(this.createPath('posts'), { title, posts });
            }).catch((error) => {
            this.logger.log(error);
        });
    };

    addPost = (req, res) => {
        const title = 'Add Post Page';
        res.render(this.createPath('add-post'), { title, post: {} });
    }

    deletePost = (req, res) => {
        Post.findByIdAndDelete(req.params.id).then(() => {
            res.redirect('/posts');
        }).catch((error) => {
            this.logger.log(error);
        });
    }

    editPost = (req, res) => {
        Post.findById(req.params.id).then(post => {
            const title = "Edit Post:" + post.name;
            res.render(this.createPath('add-post'), { title, post });
        }).catch((error) => {
            this.logger.log(error);
        });
    }

    addPostPost = (req, res) => {
        const { postId, title, content} = req.body;

        if (postId) {
            Post.findByIdAndUpdate(postId, {title, content}).then(() => {
                res.redirect('/post/' + postId);
            }).catch(error => {
                this.logger.log(error);
                res.redirect('/posts');
            });
        }else {
            const author = 'Admin';
            const post = new Post({
                title,
                content,
                author,
            });
            post.save().then(() => {
                res.redirect('/posts');
            }).catch(error => {
                this.logger.log(error);
                res.redirect('/posts');
            });
        }
    };
}

module.exports = PostController;