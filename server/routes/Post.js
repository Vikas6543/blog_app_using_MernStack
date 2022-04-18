const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

// create a new post
router.post('/post/new', async (req, res) => {
  const { title, content, visibility } = req.body;

  // check title, post are not empty
  if (!title || !content) {
    return res.status(400).json({
      message: 'Title and Content are required',
    });
  }

  try {
    // create a new post
    const post = new Post({
      title,
      content,
      visibility,
    });

    // save post to database
    await post.save();
    res
      .status(201)
      .json({ message: 'Post created successfully', newPost: post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all posts
router.get('/post/all', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a post
router.put('/post/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    // find post by id
    const post = await Post.findById(req.params.id);

    // check post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // update post
    post.title = title;
    post.content = content;

    // save post to database
    await post.save();
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {}
});

// delete a post
router.delete('/post/delete/:id', async (req, res) => {
  try {
    // find post by id
    const post = await Post.findById(req.params.id);

    // check post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // delete post
    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
