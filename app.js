const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const roster = [];
repeatTimeout();

function repeatTimeout() {
  roster.length = 0;
  setTimeout(repeatTimeout, msToMidnight());
};

function msToMidnight() {
  var now = new Date();
  var then = new Date(now);
  then.setHours(4, 15, 0, 0); //use 4 since EST = UTC-4
  return Math.abs(then - now);
}

var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/roster', (req, res) => {
  res.send(roster.toString())
});
    
app.post('/', urlencodedParser, (req, res) => {
    let name = req.body.player_name
    if (!roster.includes(name)) {
      console.log('New Player:', name);
      const data = name;
      roster.push(data);
      res.sendFile(__dirname + '/index.html');
    } else {
      res.sendFile(__dirname + '/index.html');
    }
    
});
    
app.listen(process.env.PORT || 5050);