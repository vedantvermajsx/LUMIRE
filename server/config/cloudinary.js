const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Cloudinary configured');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eira_pieces',
    format: async (req, file) => 'avif',
    public_id: (req, file) => file.originalname.split('.')[0] + '-' + Date.now(),
    transformation: [{ quality: 'auto:good' }]
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
