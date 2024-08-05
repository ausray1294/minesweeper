const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Space Force isn't a real branch");
});

const userRoutes = require('./routes/users');
const minesweepRoutes = require('./routes/minesweep');

app.use('/users', userRoutes);
app.use('/minesweep', minesweepRoutes);

module.exports = app;
