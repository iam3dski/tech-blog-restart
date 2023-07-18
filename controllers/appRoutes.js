const router = require('express').Router();
const { Users, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['post_date', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['user_name', 'email'],
        },
        {
          model: Comment,
          include: [
            {
              model: Users,
              attributes: ['user_name', 'email'],
            },
          ],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
      logged_in_id: req.session.logged_in_id,
      url: req.url,
      postId: req.params.postId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await Users.findAll({
      attributes: { exclude: ['password'] },
      order: [['user_name', 'ASC']],
      include: [
        {
          model: Post,
          include: [
            {
              model: Users,
              attributes: ['user_name', 'email'],
            }
          ],
          where: { user_id: req.session.logged_in_id }
        },
      ],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.render('dashboard', {
      users,
      logged_in: req.session.logged_in,
      logged_in_id: req.session.logged_in_id,
      url: req.url,
      updatingBlog: false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:postId', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        {
          model: Users,
          attributes: ['user_name', 'email'],
        }
      ],
    });
    if (!postData) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const users = postData.get({ plain: true });
    res.render('dashboard', {
      users,
      logged_in: req.session.logged_in,
      logged_in_id: req.session.logged_in_id,
      url: req.url,
      updatingBlog: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId, {
      include: [
        {
          model: Users,
          attributes: ['user_name', 'email'],
        },
        {
          model: Comment,
          include: [
            {
              model: Users,
              attributes: ['user_name', 'email'],
            },
          ],
        },
      ],
    });
    if (!postData) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const post = postData.get({ plain: true });
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
      logged_in_id: req.session.logged_in_id,
      url: req.url
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login', {
    url: req.url
  });
});

module.exports = router;