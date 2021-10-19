const mongoose = require('mongoose');
const mongooseAttractions = require('../db/mongooseAttractions');


const attractionsListSchema =  new mongoose.Schema({

  data: {
    type: Array,
    required : true
  }

});



const AttractionsList = mongooseAttractions.model('AttractionsList', attractionsListSchema)


module.exports = AttractionsList