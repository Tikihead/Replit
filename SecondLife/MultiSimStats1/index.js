

// https://downtimemonkey.com/add-website-downtime-monitor.php
// removed -deleted after event

const cors       = require("cors");
const fetch      = require("node-fetch");
const ejs        = require('ejs');
const path       = require("path");
const bodyParser = require('body-parser');
const express    = require('express');
const app        = express();
// const http       = require('http').Server(app);
// const io         = require('socket.io')(http);
const server     = require('http').createServer(app);
const io         = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(3000);
// ----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(cors());
app.use(express.json({ limit: '1mb' })); 
app.use(bodyParser.json() );
app.listen(8080, () => console.log('listening at 8080'));

app.use(express.static(__dirname + '/views'));

let people = "Collating...";
let fps    = "null";
let dil    = "null";
let stat   = "null";

let jdata  = {
  "D1": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null",
    
  },
  "D2": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D3": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D4": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D5": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D6": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D7": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D8": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D9": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D10": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D11": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  },
   "D12": {
    "status":"null",
    "dil":"null",
    "fps":"null",
    "avatars":"null"
  }
};




// ==============================================================

app.get('/', (request, response) => { 
   response.render('indexMain', {
      "stats": jdata
    });  
});

app.get('/ping', (request, response) => {  
  response.status(200).send("Ok")
});

app.post('/routes/:rt', (req, res) => {
  let RT   = req.params.rt;
  let data = req.body;  
  people   = data.avis;
  fps      = data.fps;
  dil      = data.dil;
  stat     = data.status;
  
  
  jdata[RT].fps     = fps;
  jdata[RT].avatars = people;
  jdata[RT].dil     = dil;
  jdata[RT].stat    = stat;
  // =================
   res.render('indexMain', {
      "stats": jdata
    });  
    
});


app.get('/chk', (req,res) => {

  let tstamp = new Date()
  .toLocaleString( 'en-US', {
     timeZone: 'America/Los_Angeles',
     hour12: true
  }); 
  res.send("Time: " + tstamp +
           "\nRegion: " + region + 
           "\nAvatars: \n \n" + people );
});
