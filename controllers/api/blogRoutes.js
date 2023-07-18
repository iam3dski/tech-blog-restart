const router = require('express').Router();
const { Users, Post } = require('../../models');

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blog posts.' });
  }
});

router.get('/list', async (req, res) => {
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
          where: { 
            user_id: req.session.logged_in_id
          } 
        },
      ],
    });
    const users = userData.map((project) => project.get({ plain: true }));
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const newBlog = await Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.body.user_id
    });
    const foundBlog = await Post.findByPk(newBlog.id);
    res.status(200).json({ blog: foundBlog, message: 'Blog post added successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/update/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const existingBlog = await Post.findByPk(blogId);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    existingBlog.post_title = req.body.post_title;
    existingBlog.post_content = req.body.post_content;
    await existingBlog.save();
    res.status(200).json({ blog: existingBlog, message: 'Blog post updated successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    await Post.destroy({ where: { id: blogId } });
    res.status(200).json({ message: 'Blog post deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;