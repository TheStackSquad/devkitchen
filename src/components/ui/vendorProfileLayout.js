// src/components/ui/vendorProfileLayout.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { vendorProfileSchema, VENDOR_TYPE_OPTIONS } from '@/schema/vendorProfileSchema';
import { updateVendorProfile } from '@/reduxStore/actions/vendorActions';
import { motion } from 'framer-motion';
import "@/styles/uiStyle/profile.css";

export default function VendorProfileLayout() {
  const dispatch = useDispatch();
  const { vendorData, isAuthenticated } = useSelector(state => state.vendor);
  cocnsole.log('isAuthenticated:', isAuthenticated);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    profile: null, // 'success' | 'error' | null
    cover: null
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(vendorProfileSchema),
    defaultValues: {
      fullname: vendorData?.sessionData?.profile?.fullname || '',
      storeName: vendorData?.sessionData?.profile?.storeName || '',
      storeDescription: vendorData?.sessionData?.profile?.storeDescription || '',
      vendorType: vendorData?.sessionData?.profile?.vendorType || '',
      address: vendorData?.sessionData?.profile?.address || ''
    }
  });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'profile') {
        setProfilePreview(reader.result);
        setUploadStatus(prev => ({ ...prev, profile: 'success' }));
      } else {
        setCoverPreview(reader.result);
        setUploadStatus(prev => ({ ...prev, cover: 'success' }));
      }
    };
    reader.onerror = () => {
      setUploadStatus(prev => ({ ...prev, [type]: 'error' }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    if (!isAuthenticated) return;

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key]) formData.append(key, data[key]);
    });

    // Add files if they exist
    const profileFile = watch('profilePic')?.[0];
    const coverFile = watch('coverImage')?.[0];
    if (profileFile) formData.append('profilePic', profileFile);
    if (coverFile) formData.append('coverImage', coverFile);

    try {
      const response = await fetch('/api/vendorProfile', {
        method: vendorData?.sessionData?.profile ? 'PATCH' : 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(updateVendorProfile(result));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profileGrid max-w-4xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
     
{/* Profile Picture Upload */}
<motion.div 
  whileHover={{ scale: 1.05 }}
  className={`relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 ${
    uploadStatus.profile === 'success' ? 'border-green-500' :
    uploadStatus.profile === 'error' ? 'border-red-500' :
    'border-gray-300'
  }`}
>
  {profilePreview && (
    <img 
      src={profilePreview} 
      alt="Profile preview" 
      className="w-full h-full object-cover"
    />
  )}
  <input
    type="file"
    accept="image/*"
    {...register('profilePic')}
    onChange={(e) => handleImageChange(e, 'profile')}
    className="absolute inset-0 opacity-0 cursor-pointer z-10"
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white transition-opacity hover:bg-opacity-70">
    <FaCamera className="text-2xl mb-2" />
    <span className="text-sm font-medium">Upload Profile</span>
  </div>
</motion.div>

{/* Cover Image Upload */}
<motion.div 
  whileHover={{ scale: 1.02 }}
  className={`relative w-full h-48 rounded-lg overflow-hidden border-2 ${
    uploadStatus.cover === 'success' ? 'border-green-500' :
    uploadStatus.cover === 'error' ? 'border-red-500' :
    'border-gray-300'
  }`}
>
  {coverPreview && (
    <img 
      src={coverPreview} 
      alt="Cover preview" 
      className="w-full h-full object-cover"
    />
  )}
  <input
    type="file"
    accept="image/*"
    {...register('coverImage')}
    onChange={(e) => handleImageChange(e, 'cover')}
    className="absolute inset-0 opacity-0 cursor-pointer z-10"
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white transition-opacity hover:bg-opacity-70">
    <FaCamera className="text-3xl mb-2" />
    <span className="text-sm font-medium">Upload Cover Image</span>
  </div>
</motion.div>

        {/* Form Fields */}
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
            <input
              {...register('fullname')}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
            <input
              {...register('storeName')}
              placeholder="Store Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">{errors.storeName.message}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
            <textarea
              {...register('storeDescription')}
              placeholder="Store Description"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all h-32"
            />
            {errors.storeDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.storeDescription.message}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
            <select
              {...register('vendorType')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Select Vendor Type</option>
              {VENDOR_TYPE_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.vendorType && (
              <p className="text-red-500 text-sm mt-1">{errors.vendorType.message}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
            <input
              {...register('address')}
              placeholder="Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isAuthenticated}
          whileHover={isAuthenticated ? { scale: 1.02 } : {}}
          whileTap={isAuthenticated ? { scale: 0.98 } : {}}
          className={`w-full p-4 rounded-lg text-white transition-all ${
            isAuthenticated 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isAuthenticated ? 'Save Profile' : 'Please Login to Save'}
        </motion.button>
      </form>
    </div>
  );
}