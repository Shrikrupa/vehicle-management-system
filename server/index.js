const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
var cors = require("cors");
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());

app.get('/vehicles', db.getAllVehicles);
app.get('/vehicle/:id', db.getVehicleByVin);
app.post('/vehicles/:id', db.editVehicle);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})