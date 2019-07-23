const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require ('passport');
const methodOverride = require('method-override');
const path = require('path');
const {ensureAuthenticated} = require('./helpers/auth');


const app = express();

//Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport)

// DB Config
const db = require('./config/database');

// Using Static folder for external css and images
app.use(express.static(path.join(__dirname, 'public')));

//Get rid of errors(Map Global Promise)
mongoose.Promise = global.Promise;

// Connecting to Database
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected.......'))
  .catch(err => console.log("Not Connected to Database ERROR! ", err));



// Handle bars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override middleware
app.use(methodOverride('_method'));

//Express Session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Passport Middleware 
app.use(passport.initialize());
app.use(passport.session());

//Flash
app.use(flash());

//Global Variables
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//index route
app.get('/', ensureAuthenticated, (req, res) => {
  res.render('home');
});

//About Route
app.get('/about', (req, res) => {
  res.render('about');
});



//Use Routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = process.env.PORT || 5000;

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
