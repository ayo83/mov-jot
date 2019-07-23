const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth'); 

//Load Idea Models
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Movie Ideas index
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
    });
});

//Add Idea Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add')
});

//process form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: 'Please add a Movie Title' });
  }
  if (!req.body.duration) {
    errors.push({ text: 'Please enter movie duration' });
  }
  if (!req.body.movieType) {
    errors.push({ text: 'Please select movie type' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please enter story building' });
  }
  if (!req.body.chaBuild) {
    errors.push({ text: 'Please enter Character Building' });
  }
  if (!req.body.stoStructureOne) {
    errors.push({text: 'Please enter Story Structure'});
  }
  if (!req.body.stoStructureTwo) {
    errors.push({text: 'Please enter Story Structure'});
  }
  if (!req.body.stoStructureThree) {
    errors.push({text: 'Please enter Story Structure'});
  }
  if (!req.body.stoStructureFour) {
    errors.push({text: 'Please enter Story Structure'});
  }
  if (!req.body.stoStructureFive) {
    errors.push({text: 'Please enter Story Structure'});
  }
  if (!req.body.stoStructureSix) {
    errors.push({text: 'Please enter Story Structure'});
  }
  if (errors.length > 0) {
    res.render('/add', {
      errors: errors,
      title: req.body.title,
      duration: req.body.duration,
      movieType: req.body.movieType,
      details: req.body.details,
      chaBuild: req.body.chaBuild,
      stoStructureOne: req.body.stoStructureOne,
      stoStructureTwo: req.body.stoStructureTwo,
      stoStructureThree: req.body.stoStructureThree,
      stoStructureFour: req.body.stoStructureFour,
      stoStructureFive: req.body.stoStructureFive,
      stoStructureSix: req.body.stoStructureSix
    });
  } else {
    const newUser = {
      title: req.body.title,
      duration: req.body.duration,
      movieType: req.body.movieType,
      details: req.body.details,
      chaBuild: req.body.chaBuild,
      stoStructureOne: req.body.stoStructureOne,
      stoStructureTwo: req.body.stoStructureTwo,
      stoStructureThree: req.body.stoStructureThree,
      stoStructureFour: req.body.stoStructureFour,
      stoStructureFive: req.body.stoStructureFive,
      stoStructureSix: req.body.stoStructureSix,
      user: req.user.id
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Movies Idea added');
        res.redirect('/ideas'); 
      })
  }
});


//Edit Movie form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      if(idea.user != req.user.id){
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/ideas')
      } else {
        res.render('ideas/edit', {
          idea: idea
        });
      }
    });
});

//Edit Form Process
router.put('/:id', ensureAuthenticated, (req, res) =>{
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    //New Values
    idea.title = req.body.title;
    idea.duration = req.body.duration;
    idea.movieType = req.body.movieType;
    idea.details = req.body.details;
    idea.chaBuild = req.body.chaBuild;
    idea.stoStructureOne = req.body.stoStructureOne;
    idea.stoStructureTwo = req.body.stoStructureTwo;
    idea.stoStructureThree = req.body.stoStructureThree;
    idea.stoStructureFour = req.body.stoStructureFour;
    idea.stoStructureFive = req.body.stoStructureFive;
    idea.stoStructureSix = req.body.stoStructureSix;
    
    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Movies Idea updated');
        res.redirect('/ideas');
      })
  })
});

//Delete Movie Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Movies Idea removed');
      res.redirect('/ideas');
    })
});



module.exports = router;