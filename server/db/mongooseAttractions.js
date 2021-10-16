const mongoose = require('mongoose')

const mongooseAttractions = mongoose.createConnection('mongodb+srv://eyal:87654321@nearestattraction.fctq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {
  useNewUrlParser: true,
  useCreateIndex : true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

module.exports = mongooseAttractions