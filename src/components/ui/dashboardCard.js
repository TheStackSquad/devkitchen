// src/components/ui/dashboardCard.js
import React from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Base card component that provides consistent styling
export const DashboardCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Grid layout component that handles responsive behavior
export const DashboardCardGrid = ({ children, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ${className}`}>
    {children}
  </div>
);

// Meal card component with hover effects and information
export const MealCard = ({ meal, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-48 w-full">
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(meal.id)}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <FaEdit className="text-gray-700" />
          </button>
          <button
            onClick={() => onDelete(meal.id)}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <FaTrash className="text-red-500" />
          </button>
        </div>
      </div>
      
      {/* Information overlay that slides up on hover */}
      <motion.div
        initial={{ y: 100 }}
        whileHover={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 bg-white/95 p-4 backdrop-blur-sm"
      >
        <h3 className="font-semibold text-lg">{meal.name}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FaHeart className="text-red-500" />
            {meal.likes}
          </span>
          <span>Ordered: {meal.orderCount} times</span>
        </div>
      </motion.div>
    </motion.div>
  );
};