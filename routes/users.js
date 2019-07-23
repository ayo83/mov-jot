const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

//Load User Model
require('../models/User');
const User = mongoose.model('users');


//user Login Route
router.get('/login', (req, res) =>{
  res.render('users/login');
});

// User Register route
router.get('/register', (req, res) =>{
  res.render('users/register');
});

//login Form Post
router.post('/login', (req, res, next) =>{
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//register Form post
router.post('/register', (req, res) =>{
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 6){
    errors.push({text:'Password must be at least 6 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else{
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already registered, Login  or try another Email');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
              if(err)throw err;
              newUser.password = hash;
              newUser.save()
                .then(user =>{
                  req.flash('success_msg', 'You are now registered and can login now');
                  res.redirect('/users/login');
                })
                .catch(err =>{
                  console.log(err);
                  return;
                });
            })
          })
        }
      });
  }
});

//Logout User
router.get('/logout', (req, res) =>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;