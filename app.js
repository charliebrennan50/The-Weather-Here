var express = require('express');
var app = express();
const pool = require("./db");
const cors = require("cors");
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

var server = app.listen(8000, function () {

  var port = server.address().port;
  console.log(`Express app listening at localhost:${port}`);

});

// app.get('/', function (req, res) {
//    res.sendFile(__dirname + "/index.html");
// });

//get all items

app.get("/api", async (req, res)=> {
  try {
      const allInputs = await pool.query("SELECT * FROM weather");
      res.json(allInputs.rows);
      console.log(allInputs.rows)
  } catch (err) {
      console.error(err.message);        
  }
});

app.post('/api', async (request, response) => {
  console.log(request.body);
  let lt = request.body.lat;
  let ln = request.body.long;
  let cds = request.body.conditions;
  let tmp = request.body.temperature;
  let hum = request.body.humidity;
  let loc = request.body.location;
  let timestamp = new Date().toLocaleString();
  request.body.timestamp = timestamp;
  try {
    const newInput = await pool.query(
      `INSERT INTO weather(Latitude, Longitude, Conditions, Temperature, Humidity, Location, TimeStamp) VALUES('${lt}', '${ln}', '${cds}', '${tmp}', '${hum}', '${loc}','${timestamp}')`);
  } catch (error) {
      console.log(error.message);
  }
});