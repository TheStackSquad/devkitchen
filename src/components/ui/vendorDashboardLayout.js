// src/components/ui/vendorDashboardLayout.js
import React from 'react';
import Image from 'next/image';
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const VendorDashboardLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push('/Vendor/Login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/placeholder-profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
                <p className="text-sm text-gray-600">Vendor Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default VendorDashboardLayout;