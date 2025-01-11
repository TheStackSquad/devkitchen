//src/app/Vendor/Signup/page.js
'use client';
import VendorSignUpForm from '@/components/ui/vendorRegForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <VendorSignUpForm />
    </div>
  );
}