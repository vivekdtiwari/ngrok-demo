const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

console.log(request.post);

const app = express();
const expressWs = require('express-ws')(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app
.get('/',(req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})
.post('/',(req,res) => {
  console.log(req.body.wow);
  res.send("Hey there");
});

app.ws('/command',(ws,req) => {

  app.get('/command',(request,response) => {
    try {
        ws.send(JSON.stringify({
          message: request.query.message
        }));
        response.send("Message Transferred");
    } catch (e) {
      console.log("measurement socket broken",e);
      response.send("Failed to send the right message");
    }
  });
  var flag = true;
  console.log("command socket connected");
});

app.listen(8080,() => console.log("App is running on http://localhost:8080"));
