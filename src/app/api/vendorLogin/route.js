// src/app/api/vendorLogin/route.js
const { NextResponse } = require('next/server');
const bcrypt = require('bcryptjs');
const connectDB = require ('@/utils/dbConnect');
const Vendor = require('@/schema/models/vendorSchemas/Vendor');
const VendorSession = require('@/schema/models/vendorSchemas/vendorSession');
const { generateTokens } = require('@/utils/jwt');
const vendorLoginSchema = require('@/schema/vendorLoginSchema');



export async function POST(req) {
  console.log('[VendorLogin API]: POST request received');

  try {
    await connectDB();
    console.log('Database connection confirmed');
    // Parse the request body
    const { email, password } = await req.json();
    console.log('[VendorLogin API]: Request body parsed:', { email });

    // Validate input
    const body = { email, password };
    await vendorLoginSchema.validate(body, { abortEarly: false });
    console.log('Validation successful');

    // Query database with timeout handling
    const vendor = await Promise.race([
      Vendor.findOne({ email: email.toLowerCase() }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 20000)
      )
    ]);

    if (!vendor) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Password verification
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Fetch session with timeout handling
    const vendorSession = await Promise.race([
      VendorSession.findOne({ vendor: vendor._id })
        .sort({ createdAt: -1 })
        .populate('profile meals payout reviews')
        .lean(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Session query timeout')), 10000)
      )
    ]);

    // Generate tokens
    const payload = {
      vendorId: vendor._id,
      email: vendor.email,
      role: vendor.role
    };
    const { accessToken, refreshToken } = generateTokens(payload);

    // Structure the response to match frontend expectations
    const responseData = {
      success: true,
      message: 'Login successful',
      vendor: {
        id: vendor._id,
        fullname: vendor.fullname,
        email: vendor.email,
        storeName: vendor.storeName,
        vendorType: vendor.vendorType,
        role: vendor.role
      },
      accessToken,
      refreshToken,
      sessionData: vendorSession ? {
        profile: vendorSession.profile || null,
        meals: vendorSession.meals || [],
        payout: vendorSession.payout || [],
        reviews: vendorSession.reviews || [],
        sessionInfo: vendorSession.sessionData || {}
      } : null
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('[VendorLogin API]: Error:', error);
    
    // Structured error response
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, {
      status: error.name === 'ValidationError' ? 400 : 500
    });
  }
}