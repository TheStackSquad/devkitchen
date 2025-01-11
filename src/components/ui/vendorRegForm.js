 // src/components/ui/vendorRegForm.js
 'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import FormInput from '@/components/ui/FormInput';

const VendorSignUpForm = () => {
  const router = useRouter();
  console.log('Form component rendered'); // Debug log

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form submission started', values); // Debug log
  
    try {
      // Correct the case of the API route
      const response = await fetch('/api/vendorSignUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      console.log('Raw response:', response); // Log the raw response for debugging
  
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      toast.success('Registration successful!');
      resetForm();
      router.push('/SignIn');
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Your Account Here!
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // Note: validation schema will be imported from userSchema.js
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormInput
              label="Username"
              name="username"
              type="text"
              id="username"
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              id="email"
            />
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              id="phone"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              id="password"
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-2 px-4 rounded-md text-white
                bg-blue-500 hover:bg-blue-600 transition-colors
                disabled:bg-blue-300 disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <span
                onClick={() => router.push('/Vendor/Login')}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VendorSignUpForm;