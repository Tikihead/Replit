const express    = require("express");
const app        = express();
const Database   = require("@replit/database");
const db         = new Database();
const bodyParser = require('body-parser'); 
const fs         = require('fs');
const crypto     = require('crypto');
const URLZobj    = require('./URLZ.json'); 
// add secondlife certificate 
require('ssl-root-cas')
  .inject()
  .addFile(__dirname + '/cert.crt');

app.use(express.json({ limit: '1mb' })); // incoming data will be json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // PARSE THE JSON
app.listen(8080, () => console.log('listening at 8080'));
// ========== FUNCS =============
let clt = (input) => {
  console.log("Type: " + typeof(input));
}
// ========== ROUTES ============

app.get("/", async (req,res) => {    
 // console.log("req hdrs: \n" + JSON.stringify(req.headers,null,4) );
  res.status(200).send('Server running...');  
});

app.get("/sec", async (req,res) => {    

         // HTTP_CUSTOM_HEADER, "x-server-status","Online",
         // HTTP_CUSTOM_HEADER, "x-server-url", url ,
  
  console.log("req hdrs: \n" + JSON.stringify(req.headers,null,4) );
  if( req.headers["x-server-url"]) {
    
      console.log("\n ID: " + req.headers["x-secondlife-owner-key"]);
      let servObj = {
       "ownerID":   req.headers["x-secondlife-owner-key"],
       "ownerNAME": req.headers["x-secondlife-owner-name"],
       "objID":     req.headers["x-secondlife-object-key"],
       "objNAME":   req.headers["x-secondlife-object-name"],
       "objURL":    req.headers["x-server-url"]
      };
    console.log("server:\n", JSON.stringify(servObj,null,4) );
  }
  res.status(200).send('Server running...');  
});

app.get("/ping", async (req,res) => {        // for pinger?
  let tstamp = new Date()
      .toLocaleString( 'en-US', {
         timeZone: 'America/Los_Angeles',
         hour12: true
      }); 
  res.status(200).send('Pinged: ' + tstamp);  
});

// only storing ONE ?
app.post("/urlz", async (req,res) => {    

    let name      = req.body.name;
    let rUrl      = req.body.url; 
    console.log("\nGOT: " + name + "-" + rUrl); 
  
    fs.readFile('./URLZ.json', 'utf8', (err, data) => {
      if (err) throw err;
      let data_json = JSON.parse(data);          
      
      data_json[name] = rUrl ;  // add or append k/v  
      let input_str = JSON.stringify(data_json,null,4);
      let urlData = fs.createWriteStream("URLZ.json", {flags:'w'});
      urlData.write( input_str ); // auto closes 
    });
  
  // ----------- fuck using a db ---------
 
  // db.set("users",{[name]:rUrl})
  // .then(dun => {  
  // })
  // .catch( console.err ); 
  
   
  // db.get( "users" )
  //   .then(data => {
   // console.log("url val: \n" + [...Object.entries(value)]);
       // Object.keys(data).forEach(function(key) {    
       //    console.log("\nKEY: " + key + "\nVAL: " +  data[key] + "\n");    
       // });
      // FUCK REPL DB
  // DBKEY: 0,users
  // DBVAL: undefined
  //     for (const [key, value] of Object.entries(data)) {
  //       console.log(`${key}: ${value}`);
  //     }
  // });
   
  // db.list().then(kdata => {
  //     Object.entries(kdata).forEach(function(key) {    
  //         console.log("\nDBKEY: " + key + "\nDBVAL: " +  kdata[key] + "\n");    
  //     });
  // });
  // ----------------------
   res.status(200).send(`URL saved:\n ${name} : ${rUrl}`);  
});

 app.get("/test", async (req,res) => {    
   let hash = req.headers['x-script-auth'];
    console.log("headers: \n" , hash );
   if( hash === "f427242f8edf68145f6a42e0839f5ccbe46d78a9a5877533c221a6dffc574762") {
     console.log(" verified! ");
   }
   res.send("mmm ok");
});
