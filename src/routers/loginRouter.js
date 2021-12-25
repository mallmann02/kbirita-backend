const { Router } = require('express');
const { loginUser } = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/loginValidations');

const router = Router();

router.post('/', validateLogin, loginUser);

module.exports = router; 
