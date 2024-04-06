const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const searchRoute = require('./routes/search');
const sortRoute = require('./routes/sort');
const filterRoute = require('./routes/filter');
const paginationRoute = require('./routes/pagination');
const authenticate = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const crypto = require('crypto');
require('dotenv').config(); 

// const generateSecretKey = () => {
//     return crypto.randomBytes(32).toString('hex');
// };

// process.env.SECRET_KEY = generateSecretKey();

console.log("Generated Secret Key:", process.env.SECRET_KEY);
app.use(bodyParser.json());

// Middleware to protect routes
app.use(authenticate);

// Routes
app.use('/search', searchRoute);
app.use('/sort', sortRoute);
app.use('/filter', filterRoute);
app.use('/pagination', paginationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
