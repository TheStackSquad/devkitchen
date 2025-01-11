
// src/middleware/imageValidation.js
export const validateImage = (req, res, next) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
  
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return res.status(400).json({ message: 'Image must be less than 5MB' });
    }
  
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        message: 'Only JPEG, JPG, PNG, and WEBP images are allowed' 
      });
    }
  
    next();
  }