//import Image from "next/image";
'use client';
import React, { useEffect } from 'react';  // Add useEffect import
import HomePageLayout from '@/components/ui/homeLayout';
import Snap from "@/components/Snap";
import Ratings from '@/components/Ratings';
import { showSuccess } from '@/utils/alertManager';
import '@/styles/home.css';

export default function Home() {
  // Wrap toast in useEffect with empty dependency array
  useEffect(() => {
    showSuccess('Toast is working!');
  }, []); // Empty array means this only runs once on mount

  return (
    <div className="Home">
      <HomePageLayout /> 
      <div className="section2">
        <Snap />
      </div>
      <div className="section3">
        <header className='star-listing'>
          Restaurants Near You
        </header>
        <Ratings />
      </div>
    </div>
  );
}