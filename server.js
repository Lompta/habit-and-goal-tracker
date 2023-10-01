const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 9001;

app.use(cors());
app.use(express.json());

app.get('/state', (req, res) => {
  fs.readFile('state.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/state', (req, res) => {
  fs.writeFile('state.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
