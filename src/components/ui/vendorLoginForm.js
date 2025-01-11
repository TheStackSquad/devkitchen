 // src/components/ui/vendorRegForm.js
 'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import FormInput from '@/components/ui/FormInput';
import { useDispatch, useSelector } from "react-redux";
import { loginVendorAction } from "@/reduxStore/actions/vendorActions";


const VendorLoginForm = () => {
  const router = useRouter();
  console.log('Form component rendered'); // Debug log
  const dispatch = useDispatch();

  const vendorState = useSelector((state) => state);
    // Log entire Redux state
    console.log('Full Redux State:', vendorState);

  const initialValues = {
    email: '',
    password: ''
  };


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form submission started', values); // Debug log
  
    try {
      // Correct the case of the API route
      const response = await fetch('/api/vendorLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

       // Parse JSON response
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed'); // Use `data.message`
    }

    const vendorData = {
      vendor: data.vendor,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      sessionData: data.sessionData,
    };
      console.log('DISPATCH DATA:', vendorData);
      
      dispatch(loginVendorAction(vendorData)); // Dispatch full vendorData
      
      localStorage.setItem("vendorData", JSON.stringify(vendorData)); // Persist data
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      toast.success('Login successful!');
      resetForm();
      router.push('/Vendor/Dashboard');
    } catch (error) {
      console.error('Login error:', error); // Debug log
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign In Here!
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // Note: validation schema will be imported from userSchema.js
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              id="email"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              id="password"
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
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{' '}
              <span
                onClick={() => router.push('/SignUp')}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VendorLoginForm;