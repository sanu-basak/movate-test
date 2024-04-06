const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const secretKey = process.env.SECRET_KEY; // Load secret key from environment variables
    if (authHeader && authHeader === secretKey) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticate;
