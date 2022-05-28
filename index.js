const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8082;
const request = require('request');
const cors = require('cors'); 


app.use(cors());
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/19904658/UVyoVdQr";

const Datastore = require("nedb");


//######################   API Rafael Molino Alvarez  ###############################//
const backendRma = require("./src/back/rafmolalvAPI/indexRma")
const backendRmaV2 = require("./src/back/rafmolalvAPI/indexRmaV2")
db_repeaters = new Datastore();

backendRma.register(app,db_repeaters);
backendRmaV2.register(app,db_repeaters);

//######################   API Javier Hidalgo García  ###############################//
const backendJHG = require("./src/back/javhidgarAPI/indexJHG.js")
db_housework = new Datastore();
backendJHG(app,db_housework);

//######################   API Sergio García Blanco  ###############################//
const backendSGB = require("./src/back/sergarblaAPI/indexSGB.js")
db_ending = new Datastore();
backendSGB(app,db_ending);

//######################   API ****  ###############################//

var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-31.herokuapp.com/api/v2/registration-stats';
  
app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


app.use("/", express.static('public'));


//###################### PROXYS Rafael Molino Alvarez ###############################//

var paths2 = '/remoteExp';
var apiServerHost2 = 'https://sos2122-27.herokuapp.com/api/v2/public-expenditure-stats';

app.use(paths2, function (req, res) {
  var url = apiServerHost2 + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


app.listen(port, ()=> {
    console.log(`Server ready at port ${port}`);
});
