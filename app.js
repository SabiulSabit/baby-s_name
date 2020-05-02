const express = require('express');
var txtomp3 = require("text-to-mp3");
const fs = require('fs');
const path = require('path');
const webshot = require('webshot');
const body = require('body-parser');

const app = express();

let port = process.env.PORT

if (port == null || port == "") {
  port = 3000;
}

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(body.urlencoded({ extended: true }));
app.use(body.json());

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
  res.render('index');

})
app.post('/generate', (req, res) => {
  var msg = req.body.msg;

  // console.log(msg);
  txtomp3.getMp3(msg, function (err, binaryStream) {
    if (err) {
      console.log(err);
      return;
    }
    var file = fs.createWriteStream("./public/FileName.mp3"); // write it down the file
    file.write(binaryStream);
    file.end();

    webshot('http://localhost:3000/','a.png' ,function(err){
      if(err) throw err;
      else console.log("SS done")
    })

    res.render("index");

  });


})

app.listen(port, () => console.log("Server is Running..."));