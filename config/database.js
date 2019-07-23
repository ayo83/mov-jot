if(process.env.NODE_ENV === 'production'){
  module.exports = { mongoURI : 'mongodb+srv://ayo83:ayomikun8000@movie-jot-kmihq.mongodb.net/test?retryWrites=true&w=majority'}
} else {
  module.exports = { mongoURI: 'mongodb://localhost/movjot'}
}