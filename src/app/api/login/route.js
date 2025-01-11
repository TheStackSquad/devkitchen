// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/schema/models/User';
import { compare } from 'bcryptjs';
import { generateTokens } from '@/utils/jwt';

export async function POST(request) {
  console.log('Login API route hit');

  try {
    await dbConnect();
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt for username:', username);

    // Find user by username
    const user = await User.findOne({ username }).select('+password');
    
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Prepare user data (excluding password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      profilePic: user.profilePic || 'default-profile-pic.webp'
    };

    console.log('Login successful for user:', userData._id);

    return NextResponse.json({
      success: true,
      user: userData,
      accessToken,
      refreshToken
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}