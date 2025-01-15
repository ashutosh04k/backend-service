const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
//imageupload controller
const handleImageUpload = async(req,res)=>{
  try{
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);
    
    res.json({
      success:true,
      message:"Image uploaded successfully",
      result,
    })
    }catch(error){
    console.log(error);
    res.json({
      success:false,
      message:"Error in uploading image",
    })
  }
}

//add a new product
const addProduct = async(req,res)=>{
  try{ 

    const {image , title , description,category,brand,price, salePrice ,totalstock} = req.body;
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalstock,
    });
    await newlyCreatedProduct.save();
    res.status(200).json({
      success:true,
      message:"Product added successfully",
      data : newlyCreatedProduct,
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error in adding product",
    })
  }
}

// fetch all product
const fetchAllProducts = async (req,res)=>{
  try{
    const listofProducts = await Product.find({});
    res.status(200).json({
      success:true,
      message:"Products fetched successfully",
      data : listofProducts,
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error in fetching products",
    })
  }
}

//edit a product

const editProduct = async(req, res)=>{
  try{
    const {id} = req.params;
    const {image , title , description,category,brand,price, salePrice ,totalstock} = req.body;
    let findProduct = await Product.findById(id);
    if(!findProduct)
      return res.status(404).json({
        success:false,
        message:"Product not found",
      });

      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description; 
      findProduct.category = category || findProduct.category;
      findProduct.brand = brand || findProduct.brand;
      findProduct.price = price === "" ? 0 : price  || findProduct.price;
      findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice; 
      findProduct.totalstock = totalstock === "" ? 0 : totalstock || findProduct.totalstock;
      findProduct.image = image || findProduct.image;
    
    await findProduct.save();
    res.status(200).json({
      success:true,
      message:"Product edited successfully",
      data : findProduct,
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error in editing product",
    })
  }
}

//delete a product

const deleteProduct = async(req, res)=>{
  try{
    const {id} = req.params;
    const findProduct = await Product.findByIdAndDelete(id);
    if(!findProduct)
      return res.status(404).json({
        success:false,
        message:"Product not found",
      });
    res.status(200).json({
      success:true,
      message:"Product deleted successfully",
      data : findProduct,
    });

  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error in deleting product",
    })
  }
}

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  deleteProduct,
  editProduct
}