const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for fetching all comments
router.get('/', async (req, res) => {
 });

// Route for creating a new comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, // Assigns the current user's ID to the comment's user_id
    });

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Exporting the router module
module.exports = router;