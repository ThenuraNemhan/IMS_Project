// multerConfig.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `product_${Date.now()}`,  // Optionally set a unique ID for each image
  },
});


const uploadFiles = multer({ storage });

export { uploadFiles };
