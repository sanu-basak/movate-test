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

router.get('/',cacheMiddleware, (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        
        if (!sortBy) {
            return res.status(400).json({ error: 'sortBy parameter is required' });
        }

        const sortedData = cachedData.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            return 0;
        });
        res.json(sortedData);
    } catch (error) {
        console.error('Error sorting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
