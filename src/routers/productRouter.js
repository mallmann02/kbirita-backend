const { Router } = require('express');
const {
  findAllProducts,
  findSpecificProduct,
} = require('../controllers/productController');

const router = Router();

router.get('/', findAllProducts);

router.get('/:id', findSpecificProduct);

module.exports = router; 
