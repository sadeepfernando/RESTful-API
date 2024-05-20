const express = require('express');
const router = express.Router();
const {categoryController} = require('../controllers/index');
const { addCatagoryValidator , idValidator } = require('../validators/category');
const validate = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', isAuth , isAdmin , addCatagoryValidator , validate , categoryController.addCategory);

router.put('/:id', isAuth , isAdmin ,idValidator, validate , categoryController.updateCategory );

router.delete('/:id', isAuth , isAdmin , idValidator , validate, categoryController.deleteCategory);

router.get('/', isAuth , categoryController.getCategories);

router.get('/:id', isAuth , idValidator, categoryController.getCategory);


module.exports = router;