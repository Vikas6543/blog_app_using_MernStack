const express = require('express');
const app = express();
const connectDatabase = require('./Connection');
const dotenv = require('dotenv');
const cors = require('cors');
const post = require('./routes/Post');

// dot env
dotenv.config();

// database initialization
connectDatabase();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/', post);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
