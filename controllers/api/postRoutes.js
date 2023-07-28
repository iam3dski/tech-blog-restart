const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for rendering the post creation form
router.get('/create', withAuth, async (req, res) => {
  try {
    res.render('createPost', {
      layout: 'dash',
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for fetching and rendering a specific post
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('createPost', {
      ...post,
      layout: 'dash',
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for creating a new post
router.post('/', async (req, res) => {
  try {
    console.log('Received request data:', req.body); // Log the received request data

    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('Created post:', newPost); // Log the created post object

    res.status(200).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err); // Log any errors that occur
    res.status(400).json(err);
  }
});

// Route for updating an existing post
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        ...req.body,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for deleting a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;