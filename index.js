const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50MB", type:'application/json'}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/api', (req, res) => {
  const { data } = req.body;
  const dataBuffer = new Buffer(data, 'base64');
  try {
    const fileStream = fs.createWriteStream('finalvideo2.webm', {flags: 'a'});
    fileStream.write(dataBuffer);
    console.log(dataBuffer);
    return res.json({gotit: true});
  } catch (error) {
    return res.json({gotit: false});
  }
});

app.post('/final', (req, res) => {
  try {
    const fileStream = fs.createWriteStream('finalvideo2.webm', {flags: 'a'});
    fileStream.end();
    return res.json({saved: true});
  } catch (error) {
    return res.json({saved: false});
  }
});

function getFileStream(filePath) {
  try {
    const fileStream = fs.createWriteStream(filePath, {flags: 'a'});
    return fileStream;
  } catch (error) {
    
  }
}

server.listen(3005, async function () {
  console.log('Server is running on port 3005...')
});