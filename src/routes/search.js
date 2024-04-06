const express = require('express');
const router = express.Router();
const path = require('path');
const jsonfile = require('jsonfile');

let cachedData = null;

const loadData = () => {
    const dataPath = path.join(__dirname, '..', 'utils', 'data.json');
    cachedData = jsonfile.readFileSync(dataPath).users;
};

const cacheMiddleware = (req, res, next) => {
    if (!cachedData) {
        loadData();
    }
    
    next();
};


router.get('/', cacheMiddleware,(req, res) => {
    try {
        const searchTerm = req.query.q;

        if (!searchTerm || searchTerm.trim() === '') {
            return res.status(400).json({ error: 'Search term is required' });
        }

        const searchResults = cachedData.filter(item => item.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

        res.json(searchResults);
    } catch (error) {
        console.error('Error occurred during search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
