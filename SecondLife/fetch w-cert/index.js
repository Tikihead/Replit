
const fetch     = require('node-fetch');

// use cert from SL - the file, cert.crt
require('ssl-root-cas')
  .inject()
  .addFile(__dirname + '/cert.crt');

// use your own secure url from an SL prim
let url_3 = "https://simhost-09c4d0b0a462c5bce.agni.secondlife.io:12043/cap/d83bc3ea-2486-4e8f-6eb3-a5fe6c0acb3d";

let url_4 = "https://simhost-0c0b39c88e2badc67.agni.secondlife.io:12043/cap/34dc6fcb-c3e9-c086-3126-5d8a419ebf11/?cmd=stats";

async function sendr() {
  
  console.log("sending...");
  const body = {
    name: 'xiija', 
    subj: 'the codes !',
    txt: 'some text that is worth sending to you?'
  };

  const response = await fetch(url_4, {
  	method: 'post',
  	body: JSON.stringify(body),
  	headers: {'Content-Type': 'application/json'}
  })
  .then(resp => {
    let bod = resp.text(); // [object Promise] 
    return bod;
  }) 
  .then(resp2 => {   
    console.log("resp2:\n" + resp2);
  }); 
};


sendr();
console.log("Node verz: " + process.version);
"";
