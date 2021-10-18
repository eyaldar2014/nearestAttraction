const express = require('express');
const app = express();
const cors = require('cors');
const attractionsRoute = require('./routes/route.attractions')


app.use(express.json())
app.use(cors());



app.use('/api/attractions', attractionsRoute)


module.exports = app