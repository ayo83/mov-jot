const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const IdeaSchema = new Schema ({
  title:{
    type: String,
    required: true
  },
  
  chaBuild:{
    type: String,
    required: true
  },
  duration:{
    type: Number,
    required: true
  },

  movieType: {
    type: String,
    required: true
  },

  details:{
    type: String,
    required: true
  },

  stoStructureOne: {
    type: String,
    required: true
  },
  stoStructureTwo: {
    type: String,
    required: true
  },
  stoStructureThree: {
    type: String,
    required: true
  },
  stoStructureFour: {
    type: String,
    required: true
  },
  stoStructureFive: {
    type: String,
    required: true
  },
  stoStructureSix: {
    type: String,
    required: true
  },

  user: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('ideas', IdeaSchema);