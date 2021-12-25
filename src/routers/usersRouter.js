const { Router } = require('express');
const {
  listUsers,
  adminList,
  removeUser,
} = require('../controllers/usersController');
const { validateJWT } = require('../middlewares/validateJwt');

const router = Router();

router.get('/', listUsers);

router.get('/admin', validateJWT, adminList);

router.delete('/:id', validateJWT, removeUser);

module.exports = router;
