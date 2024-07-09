// https://github.com/programmingmentor/form-nodejs-mongodb

var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
const Datastore = require('nedb');

const app = express();
const database = new Datastore('Data/database.db');
database.loadDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'Data')));
app.use(express.json({ limit: '1mb' }));
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0',
 () => console.log('listening at 3000') );

app.get('/view-feedbacks', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/post-feedback', (request, response) => {
  const data = request.body;
  //const timestamp = Date.now();
 // data.timestamp = timestamp;

  database.insert(data);
  response.json(data);
  console.log("Data:\n " + JSON.stringify(data,null,4));
});

/*
 json shows at ... https://nedb-form-1.xiija.repl.co/post-feedback
 not saved?

*/
