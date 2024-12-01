const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {try {const token = req.header('Authorization').replace('Bearer ', '');
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();} catch (error) {res.status(401).json({ message: 'Authentication required' })}};
const adminOnly = (req, res, next) => {if (req.user.role !== 'admin') {return res.status(403).json({ message: 'Admin access required' })};
next()};
module.exports = { auth, adminOnly };