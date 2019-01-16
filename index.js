const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

console.log(request.post);

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app
.get('/',(req,res) => {
  res.send("Basic landing page");
})
.post('/',(req,res) => {
  console.log(req.body.wow);
  res.send("Hey there");
})

app.listen(8080,() => console.log("App is running on http://localhost:8080"))
