const { Router } = require('express');
const { registerUser } = require('../controllers/registerController');
const { validateNewUserData } = require('../middlewares/registerValidations');
const { validateJWT } = require('../middlewares/validateJwt');

const router = Router();

router.post('/', validateJWT, validateNewUserData, registerUser);

module.exports = router; 
