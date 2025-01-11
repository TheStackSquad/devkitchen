// src/app/api/vendorSignUp/route.js
const { NextResponse } = require('next/server');
const dbConnect = require('@/utils/dbConnect');
const Vendor = require('@/schema/models/vendorSchemas/Vendor');
const { hash } = require('bcryptjs');


export async function POST(request) {
  console.log('Vendor SignUp API route hit'); // Debug log

  try {
    const body = await request.json();
    console.log('Request body:', body); // Debug log

    // Connect to the database
    await dbConnect();
    console.log('Database connected'); // Debug log

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ 
      $or: [{ email: body.email }, { username: body.username }] 
    });

    if (existingVendor) {
      console.log('Vendor already exists:', existingVendor.email); // Debug log
      return NextResponse.json(
        { message: 'Vendor already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(body.password, 12);
    console.log('Password hashed'); // Debug log

    // Create a new vendor
    const vendor = await Vendor.create({
      username: body.username,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
    });

    console.log('Vendor created:', vendor._id); // Debug log

    // Return success response
    return NextResponse.json(
      { message: 'Vendor created successfully' },
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
