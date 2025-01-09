// src/app/layout.js
'use client';
import React, { Suspense } from 'react';
import {
  FaHome,
  FaUser,
  FaUtensils,
  FaMoneyCheckAlt,
  FaSignInAlt,
  FaTachometerAlt,
  FaPhone } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Navbar';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <head>
  <link
    rel="preload"
    href="/asset/fontz/Macondo-Regular.woff"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
    <link
    rel="preload"
    href="/asset/fontz/JosefinSans-Regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>


      <body>
        <Header navItems={[
          { name: 'Home', path: '/', icon: <FaHome />, color: 'orchid'  },
          { name: 'Account', path: '/createAccount',  icon: <FaUser />, color: 'deepskyblue'},
          { name: 'Menu', path: '/Menu', icon: <FaUtensils />, color: 'tomato' },
          { name: 'Payment', path: '/Payment', icon: <FaMoneyCheckAlt />, color: 'limegreen' },
          { name: 'Login', path: '/Login', icon: <FaSignInAlt />, color: 'goldenrod'  },
          { name: 'Dashboard', path: '/Dashboard',  icon: <FaTachometerAlt />, color: 'goldenrod'  },
          { name: 'Contact', path: '/Contact', icon: <FaPhone />, color: 'slateblue' },
        ]} />
         <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence mode="sync" initial={false}>
          {children}
        </AnimatePresence>
        </Suspense>
      </body>
    </html>
  );
}