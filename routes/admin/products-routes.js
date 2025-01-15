const express = require('express');

const {
  handleImageUpload,addProduct,fetchAllProducts,deleteProduct,editProduct
} = require("../../controllers/admin/productscontroller");

const {upload} = require("../../helpers/cloudinary");

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.get('/get', fetchAllProducts);
router.delete('/delete/:id', deleteProduct);
router.put('/edit/:id', editProduct);

module.exports = router;