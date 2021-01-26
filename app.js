require('./db');
const mongoose = require('mongoose');
const Plant = mongoose.model('Plant');
const config = require("./config.json");


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const axios = require('axios')
const app = express();

// enable sessions
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
};
app.use(session(sessionOptions));

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`Method: ${req.method}\nPath: ${req.path}\nQuery String: ${JSON.stringify(req.query)}\n`);
  next();
});

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

//trefle API 
const fetch = require('node-fetch');



const toolkits = require('./toolkit.js');
let toolkit = toolkits.toolkit;
let toolkitData = [];
//reads the json files in labeled bears
toolkits.readFiles('./toolkit/', function(content) {
  //adds new bear object to array
    toolkitData.push(new toolkit(content.subject, content.image, content.details, content.learnmore));
  });


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/toolkit', (req, res) => {
  let filteredtoolkit = toolkitData.slice();
  if(req.query.subject) {
    filteredtoolkit = toolkitData.filter(toolkit => toolkit.subject === req.query.subject);
  }

  res.render('toolkit',{filteredtoolkit : filteredtoolkit});
});


app.get('/myplants', (req, res) => {
  const query = {};
  if(req.query.name){
    query.name = req.query.name;
  }
  if(req.query.nickname){
    query.nickname = req.query.nickname;
  }
  if(req.query.space){
    query.space = req.query.space;
  }
  if(req.query.waterFreq){
    query.waterFreq = req.query.waterFreq;
  }
  if(req.query.light){
    query.light = req.query.light;
  }
  Plant.find(query, function(err, result, count) {
    if(err){
      res.send(err);
    }
    console.log(result);
    res.render('myplants', {results: result});
  });
});

app.post('/myplants', (req, res) => {
  new Plant({
    name: req.body.name,
    nickname: req.body.nickname,
    image_url: req.body.image_url,
    space: req.body.space,
    waterFreq: req.body.waterFreq,
    light: req.body.light
  }).save(function(err, result, count){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.redirect('/myplants');
    //res.render('myplants', { plants : result});
});

});

app.get('/search', (req, res) => {
  res.render('search');
});

app.post("/search", (req, res) => {

  const response = fetch("https://trefle.io/api/v1/plants/search?token=".concat(config.trefleToken).concat("&q=").concat(req.body.searchQuery))
  .then(res => res.json())
  .then(function(apiResponse){
      const results = apiResponse.data; 
      console.log(results);              
      res.render('search', {results: results})  
  })

});


app.listen(process.env.PORT || 3000);
