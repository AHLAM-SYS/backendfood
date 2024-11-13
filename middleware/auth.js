const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        // Verify the token with your secret key (same as used for JWT creation)
        const decoded = jwt.verify(token, 'your_jwt_secret');  // Use the same secret key as in login/signup
        req.user = decoded;  // Attach the decoded user data to the request object
        next();  // Pass control to the next route handler
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
