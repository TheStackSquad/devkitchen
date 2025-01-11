//src/app/api/auth/register/route.js

// src/app/api/register/route.js
const { NextResponse } = require('next/server');
const dbConnect = require('@/utils/dbConnect');
const User = require('@/schema/models/User');
const { hash } = require('bcryptjs');

export async function POST(request) {
  console.log('Register API route hit'); // Debug log
  
  try {
    const body = await request.json();
    console.log('Request body:', body); // Debug log

    await dbConnect();
    console.log('Database connected'); // Debug log

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: body.email }, { username: body.username }] 
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.email); // Debug log
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(body.password, 12);
    console.log('Password hashed'); // Debug log

    // Create new user
    const user = await User.create({
      username: body.username,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      password: hashedPassword,
    });

    console.log('User created:', user._id); // Debug log

    // Return success response without sensitive data
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}