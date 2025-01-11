// src/appVendor/page.js

"use client";

import CardSlide from "@/components/motion/cardSlide";

export default function Vendor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Dev-Kitchen Vendor Hub
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our platform and start growing your food business today. 
            Manage orders, track analytics, and reach more customers.
          </p>
        </div>
        <div className="mt-8">
          <CardSlide />
        </div>
      </div>
    </div>
  );
}