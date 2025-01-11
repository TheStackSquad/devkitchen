// src/middleware/fileUploadMiddleware.js

import path from 'path';
import crypto from 'crypto';

// Middleware to handle file renaming
export const renameUploadedFile = (req, res, next) => {
  if (req.file) {
    const uniqueSuffix = crypto.randomBytes(6).toString('hex');
    const fileExtension = path.extname(req.file.originalname);
    req.file.filename = `${Date.now()}-${uniqueSuffix}${fileExtension}`;
  }
  next();
};
