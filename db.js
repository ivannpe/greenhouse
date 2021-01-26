//DATA MODEL
const mongoose = require('mongoose');

// plant information
const Plant = new mongoose.Schema({
  name: {type: String, required: true},
  nickname: {type: String, required: false},
  image_url: {type: String, required: false},
  space: {type: String, required: false},
  waterFreq: {type: String, required: false},
  light: {type: String, required: false}
});


mongoose.model('Plant', Plant);


// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
  // if we're in PRODUCTION mode, then read the configration from a file
  // use blocking file io to do this...
  const fs = require('fs');
  const path = require('path');
  const fn = path.join(__dirname, 'config.json');
  const data = fs.readFileSync(fn);

  // our configuration file will be in json, so parse it and set the
  // conenction string appropriately!
  const conf = JSON.parse(data);
  dbconf = conf.dbconf;
} else {
  // if we're not in PRODUCTION mode, then use
  dbconf = 'mongodb://localhost/ip807';
}
mongoose.connect(dbconf);