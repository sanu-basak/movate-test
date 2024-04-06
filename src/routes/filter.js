const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');

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

router.get('/',cacheMiddleware ,(req, res) => {
    try {
        const filterBy = req.query.filterBy;
        const filterValue = req.query.filterValue;

        if (!filterBy || !filterValue) {
            return res.status(400).json({ error: 'filterBy and filterValue parameters are required' });
        }
        
        const filteredData = cachedData.filter(item => item[filterBy] === filterValue);

        res.json(filteredData);
    } catch (error) {
        console.error('Error occurred during filtering:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
