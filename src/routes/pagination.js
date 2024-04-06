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

router.get('/', cacheMiddleware, (req, res) => {
    try {
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1) {
            return res.status(400).json({ error: 'Page number must be greater than or equal to 1' });
        }
        if (limit < 1) {
            return res.status(400).json({ error: 'Limit must be greater than or equal to 1' });
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedData = cachedData.slice(startIndex, endIndex);

        res.json(paginatedData);

    } catch (error) {
        console.error('Error occurred during pagination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
