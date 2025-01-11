// src/app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import { writeFile, unlink, readdir } from 'fs/promises';
import path from 'path';
import User from '@/schema/models/User';
import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import { mkdir } from 'fs/promises';

// Helper function to ensure upload directory exists
async function ensureUploadDir(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
    console.log('Upload directory ensured:', dirPath);
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw error;
  }
}

// Helper function to extract and verify token
function extractToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header found');
  }
  return authHeader.split(' ')[1];
}

// New helper function to clean up old profile images
async function cleanupOldProfileImages(uploadDir, userId) {
  try {
    console.log('Cleaning up old profile images for user:', userId);
    
    // Read all files in the directory
    const files = await readdir(uploadDir);
    
    // Find and delete files that contain the user's ID
    for (const file of files) {
      if (file.includes(userId)) {
        const filePath = path.join(uploadDir, file);
        console.log('Deleting old profile image:', filePath);
        await unlink(filePath);
      }
    }
  } catch (error) {
    console.error('Error cleaning up old profile images:', error);
    // We don't throw the error here to avoid interrupting the upload process
    // but we log it for debugging purposes
  }
}

export async function POST(req) {
  console.log('Dashboard API route hit');
  
  try {
    // 1. Extract and verify authorization token first
    const authHeader = req.headers.get('authorization');
    console.log('Auth header received:', authHeader);
    
    if (!authHeader) {
      console.error('No authorization header present');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Verify the token and extract user ID
    let decodedToken;
    try {
      const token = extractToken(authHeader);
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, user ID:', decodedToken.userId);
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 3. Parse the form data after authentication
    const formData = await req.formData();
    const file = formData.get('profilePic');
    const userId = formData.get('userId');

    // 4. Validate user ID matches token
    if (decodedToken.userId !== userId) {
      console.error('User ID mismatch');
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    if (!file) {
      console.error('No file provided in request');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 5. Setup upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'userProfile');
    await ensureUploadDir(uploadDir);

    // 6. Clean up old profile images before saving new one
    await cleanupOldProfileImages(uploadDir, userId);

    // 7. Process the file upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with original extension
    const fileExtension = path.extname(file.name);
    const timestamp = Date.now();
    const filename = `${timestamp}-${userId}${fileExtension}`;
    const filepath = path.join(uploadDir, filename);

    console.log('Saving new file to:', filepath);
    await writeFile(filepath, buffer);

    // 8. Update database with new profile picture path
    await dbConnect();
    const relativePath = `/uploads/userProfile/${filename}`;
    
    console.log('Updating user profile picture in database:', relativePath);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: relativePath },
      { new: true }
    );

    if (!updatedUser) {
      console.error('User not found in database:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Profile picture updated successfully');
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      profilePic: relativePath
    });

  } catch (error) {
    console.error('Error in profile upload:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}