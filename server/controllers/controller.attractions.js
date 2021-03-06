const axios = require('axios')
const AttractionsList = require('../models/model.attractionsList');

// gov api data for attractions
const api = 'https://data.gov.il/api/3/action/datastore_search?resource_id=29f4ec99-ec7f-43c1-947e-60a960980607&limit=40'


const AttractionsController = function () {

  this.getAttractionsList = async (req, res) => {
    // console.log('called getAttractionsList')

    // two options : if db is empty, callApi function will be executed. else, the function will send back data from mongodb
    try{
      const attractions = await AttractionsList.find()
      if (attractions.length === 0) return this.callApi(req, res)

      res.status(200).send({'attractions' : attractions[0]})
    }
    catch(error){
      res.status(500).send(error)
    }
  }

  // NOTE : this function always returns the same/first 40 attractions from the api (the api call url is modified to do so). could be upgraded.
  this.callApi = async (req, res) => {
    // console.log('called callApi')

    try{
      const response = await axios.get( api )
      
      // arrange data from api for later usage : one array with all the attractions.
      // for each attraction all the necessary fields are stored in good syntax
      const data = []
      response.data.result.records.forEach(element => {
        let temp = {}
        temp.name = element.Name
        temp._id = element.Id
        temp.address = element.Address
        // if there are no opening hours 'temp.openingHours' will be empty string
        temp.openingHours = element.Opening_Hours
        // longitude is X
        temp.longitude = element.X
        // latitude is Y
        temp.latitude = element.Y
        temp.link = element.URL
        temp.type = element.Attraction_Type

        data.push(temp)
      });

      
      const toUpload = new AttractionsList({data})
      const saved = await toUpload.save()

      res.status(201).send({'attractions' : saved})
    }
    catch(error) {
      res.status(500).send({'error' : error})
    }
  }

}


module.exports = AttractionsController