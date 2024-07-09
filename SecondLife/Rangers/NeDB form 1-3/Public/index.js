//function setup() { 
 
// window.onload = function() {
//   let mydate   = document.getElementById('date2');
//   mydate.innerHTML = new Date().toLocaleDateString();
// };

//console.log("date: " + date.innerHTML);
 const mydate     = document.getElementById('date');
 mydate.innerHTML = new Date().toLocaleDateString();

 

var button = document.getElementById("submit");

button.addEventListener('click', async event => {

  const today = new Date().toLocaleDateString();

  const iDate  = document.getElementById('Incident-Date').value;
  const eName  = document.getElementById('Event-Name').value;
  const yname  = document.getElementById('your-name').value;
  const sname  = document.getElementById('subj-name').value;
  const suuid  = document.getElementById('subj-uuid').value;
  const slurl  = document.getElementById('slurl').value;
  const issue  = document.getElementById('issue-type').value;
  const ar     = document.getElementById('AR').value;
  const report = document.getElementById('report').value;
 // const ar     = document.getElementById('sel');
 // let arTxt    = ar.options[ar.selectedIndex].text;
  //const submit = document.getElementById('submit');
    
    const data2 = { 
      "j_date":   today, 
      "j_idate":  iDate, 
      "j_ename":  eName, 
      "j_yname":  yname,
      "j_sname":  sname,
      "j_suuid":  suuid,
      "j_slurl":  slurl,
      "j_issue":  issue,
      "j_report": report,     
      "status": "open"
     };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)     
    }; // end options

    // send data as a post to be stored in the db
    const response = await fetch('/post-feedback', options);
    const json = await response.json();  
    return response.end;
  });  // end listener


    // RESET FIELDS TO BLANK
    
  /*
} // end setup
*/

// cannot use console log outside of main js
// d.txtContent wont allow <br> or \n

/*
const timestamp = new Date().toLocaleString();
  data.timestamp = timestamp;
  database.insert(data);
  */
