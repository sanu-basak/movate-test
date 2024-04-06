const fs = require('fs').promises;
const path = require('path');

let cachedData = null;

const loadData = async () => {
    try {
        const dataPath = path.join(__dirname, '..', 'utils', 'data.json');
        const rawData = await fs.readFile(dataPath);
        cachedData = JSON.parse(rawData).users;
    } catch (error) {
        console.error('Error loading data:', error);
    }
};
const cacheMiddleware = (req, res, next) => {
    if (!cachedData) {
        loadData();
    }
    next();
};

module.exports = { cachedData, loadData, cacheMiddleware };