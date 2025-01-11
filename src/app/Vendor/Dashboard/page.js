// src/app/Vendor/Dashboard/page.js
'use client';

import React, { Suspense } from 'react';
import VendorDashboardLayout from '@/components/ui/vendorDashboardLayout';
import { DashboardCardGrid, MealCard } from '@/components/ui/dashboardCard';
import { ClipLoader } from "react-spinners";

// Dummy data for demonstration
const dummyMeals = [
  {
    id: 1,
    name: 'Jollof Rice Special',
    imageUrl: '/meals/jollof-rice.jpg',
    likes: 124,
    orderCount: 89,
  },
  // Add more dummy meals...
];

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <ClipLoader color="#4F46E5" />
  </div>
);

export default function Dashboard() {
  const handleEdit = (id) => {
    console.log('Edit meal:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete meal:', id);
  };

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        {/* Dashboard header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Meals</h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Add New Meal
          </button>
        </div>

        {/* Meals grid with loading state */}
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardCardGrid>
            {dummyMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </DashboardCardGrid>
        </Suspense>
      </div>
    </VendorDashboardLayout>
  );
}