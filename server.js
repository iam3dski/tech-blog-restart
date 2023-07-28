const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

// Configure session middleware
const sess = {
  secret: 'Super secret secret', // Secret key for session encryption
  cookie: {
    maxAge: 300000, // Session expiration time (in milliseconds)
    httpOnly: true, // Restrict cookie access to HTTP(S) requests
    secure: false, // Allow cookie transmission over unsecure connections (HTTP)
    sameSite: 'strict', // Restrict cookie access to same-site requests
  },
  resave: false, // Do not save the session if it was not modified
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({
    db: sequelize, // Use Sequelize to store session data in the database
  }),
};

app.use(session(sess)); // Use the session middleware

app.engine('handlebars', hbs.engine); // Set up the handlebars engine
app.set('view engine', 'handlebars'); // Set the view engine for rendering

app.use(express.json()); // Parse request bodies in JSON format
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

app.use(routes); // Set up routes

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening')); // Start the server
});
