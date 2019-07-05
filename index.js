const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

const chunks = [];

app.post('/api', (req, res) => {
  const { data, filename } = req.body;
  const dataBuffer = new Buffer(data, 'base64');
  try {
    const fileStream = fs.createWriteStream(`somedir/${filename}`, {flags: 'a'});
    fileStream.write(dataBuffer);
    console.log(dataBuffer);
    return res.json({gotit: true});
  } catch (error) {
    return res.json({gotit: false});
  }
});

// app.post('/finish', (req, res) => {
//   const { filename } = req.body;

//   const buf = Buffer.concat(chunks);

//   console.log(buf) //empty buff
//   fs.writeFile('save.webm', buf, (err) => {
//     console.log('Ahh....', err)
//   });

//   res.json({ save: true })
// });

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