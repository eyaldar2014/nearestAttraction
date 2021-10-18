const express = require('express');
const app = express();
const cors = require('cors');
const attractionsRoute = require('./routes/route.attractions')
const methodsRoute = require('./routes/route.methods')


app.use(express.json())
app.use(cors());



app.use('/api/attractions', attractionsRoute)
app.use('/api/methods', methodsRoute)


module.exports = app