const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  // create session object
  secret: 'Super secret secret', // secret key
  cookie: {
    // cookie object
    maxAge: 34560000, // cookie expires after 400 day
    httpOnly: true, // cookie is not accessible via client-side JS
    secure: false, // cookie is only sent to the server with an encrypted request
    sameSite: 'strict', // cookie is not sent if the domain doesn't match the request origin
  },
  resave: false, // forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: true, // forces a session that is "uninitialized" to be saved to the store
  store: new SequelizeStore({
    // create new SequelizeStore object
    db: sequelize, // pass sequelize connection
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});