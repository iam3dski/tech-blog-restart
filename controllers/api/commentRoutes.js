const router = require('express').Router();
const { Users, Comment } = require('../../models');

router.post('/add', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_content: req.body.comment_content,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    });

    const foundComment = await Comment.findByPk(newComment.id);

    res.status(200).json({ comment: foundComment, message: 'Comment added successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/getComments/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;

    const commentsData = await Comment.findAll({
      where: { post_id: blogId },
      include: [{ model: Users, attributes: ['user_name'] }],
    });

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;