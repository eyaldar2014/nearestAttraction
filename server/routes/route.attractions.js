const express = require('express');
const router = express.Router();


const AttractionsController = require('../controllers/controller.attractions')
const attractionsController = new AttractionsController()


router.get('/getAttractionsList', attractionsController.getAttractionsList)



module.exports = router;