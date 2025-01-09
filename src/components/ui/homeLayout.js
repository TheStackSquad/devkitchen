//src/components/ui/Home.js
'use client';
import React from 'react';
import FlashText from "@/components/FlashText";
import SlideNav from "@/components/motion/slideNav";
import texts from '@/components/objects/texts';
import '@/styles/uiStyle/homeLayout.css';
import '@/styles/componentStyle/slideNav.module.css';

function Home() {
  return (
    <div className="home">
    <div className="section1">
    <FlashText texts={texts} />
    <SlideNav /> 
    </div>
  </div>
  )
}

export default Home