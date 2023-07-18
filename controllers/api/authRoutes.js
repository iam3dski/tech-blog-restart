const router = require('express').Router();
const { Users } = require('../../models');

//creates new user on sign up
router.post('/create', async (req, res) => {
  try {
    const newUser = await Users.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    });

    const userData = await Users.findOne({ where: { email: newUser.email } });

    req.session.save(() => {
      req.session.logged_in_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Successful login.' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// log in and authenticates the user
router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { user_name: req.body.username } });

    if (!userData) {
      res.status(400).json({ error: 'Username is not registered. Please sign up.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ error: 'Incorrect password.' });
      return;
    }

    req.session.logged_in_id = userData.id;
    req.session.logged_in = true;

    req.session.save((err) => {
      if (err) {
        res.status(400).json({ error: 'An error occurred while saving the session.' });
        return;
      }

      res.status(200).json({ message: 'You are now logged in.' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// log out the user
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
//returners 404 if user isn't logged in
  } else {
    res.status(404).end();
  }
});

module.exports = router;
