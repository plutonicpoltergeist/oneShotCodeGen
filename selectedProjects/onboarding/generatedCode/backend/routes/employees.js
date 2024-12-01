const express = require('express');const router = express.Router();const {createEmployee,getEmployees} = require('../controllers/employeeController');const {authMiddleware,adminOnly} = require('../middleware/auth');router.post('/',authMiddleware,adminOnly,createEmployee);router.get('/',authMiddleware,adminOnly,getEmployees);module.exports = router;