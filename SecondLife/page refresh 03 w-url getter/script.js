// pull url from a google spreadsheet
// the spreadsheet info is non private so i don't mind showing the ID .
// the repl all of a sudden stopped working ....?


// ==========================================================

  let tm           = document.getElementById("s1");
  let dynamicPart2 = document.getElementById("dynamicPart2");  
  let url = "https://docs.google.com/spreadsheets/d/1yoALf1_MGmwyohAwnuFtg3zyjSKxyxwlPwM6VtsQ78E/gviz/tq?tqx=out:json&sheet=Data&gid=0&range=B2";


// https://docs.google.com/spreadsheets/d/1yoALf1_MGmwyohAwnuFtg3zyjSKxyxwlPwM6VtsQ78E/edit#gid=0
// https://docs.google.com/spreadsheets/d/1yoALf1_MGmwyohAwnuFtg3zyjSKxyxwlPwM6VtsQ78E/edit?usp=sharing
// ---------------------------------------------------------------------------
let time = function() {   
     let tstamp = new Date()
      .toLocaleString( 'en-US', {
         timeZone: 'America/Los_Angeles',
         hour12: true
      }); 
      return tstamp;   
};
// ---------------------------------------------------------------------------
let url3 = "https://api.ipify.org?format=json";
async function load() {
  fetch(url3)
  .then(res  => res.json())
  .then(jdata => {
    // document.getElementById("ip").innerHTML = jdata.ip; 
     let url2 = "https://ipapi.co/"+jdata.ip+"/json/";  
     async function getdata() {
        fetch(url2)
       .then(res  => res.json())
       .then(jdata2 => {
          let lat  = jdata2.latitude;
          let long = jdata2.longitude;
          let target = jdata2.city + ", " + jdata2.region + ", " + jdata2.country_name;
          // document.getElementById("lat").innerHTML +=  lat;
          // document.getElementById("long").innerHTML += long;   
          document.getElementById("e1").innerHTML += target; 

       })
       .catch(err => {   
       });   
     };
     getdata();
  }) 
  .catch(err => {   
  }); // end fetch  
}; // end refresh
load();
// --------------------------------------------------------------------------------
//fetch url from google and http req it.
async function refresh() {
  
  fetch(url)
  .then(res  => res.text())
  .then(data => {
     data = data.substr(47).slice(0,-2);   
     return data;
  })
  .then(info => {       
       let info2 = info;
       info = JSON.parse(info);      
       let slurl = info.table.rows[0].c[0].v;     
       let tmp = slurl.replace("{people=","");
       tmp = tmp.replace("}","");
       tmp = tmp.replaceAll("," , "<br>");  
       dynamicPart2.innerHTML = "ON PLAYA: <br><br>"  + tmp;  
      let currtime = time();
      tm.innerHTML = currtime;
  })
  .then(info2 => {   
  })
  .catch(err => {   
  });
  setTimeout(refresh,1000);  // disabled for testing
};

 refresh();

// ==================================


 
