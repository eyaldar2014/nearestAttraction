const express = require('express');
const router = express.Router();


const MethodsController = require('../controllers/controller.methods')
const methodsController = new MethodsController()


router.get('/getLocation', methodsController.getLocation)



module.exports = router;