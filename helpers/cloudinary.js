const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET

  cloud_name:"dgsgxuvra",
  api_key:"242239857481696",
  api_secret :"AcfgeEGMP_2MXR5n-YQkyAkc_bE",

});


const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  }); 
  return result;
}

const upload = multer({ storage });

module.exports = {
  imageUploadUtils,
  upload,
};