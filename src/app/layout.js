// src/app/layout.js
"use client";
import React, { Suspense } from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/reduxStore/store';

import {
  FaHome,
  FaUser,
  FaUtensils,
  FaMoneyCheckAlt,
  FaSignInAlt,
  FaTachometerAlt,
  FaPhone,
} from "react-icons/fa";
import { ToastContainer } from '@/utils/alertManager';
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Navbar";
import "@/styles/globals.css";

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
      <Provider store={store}>
      <PersistGate loading={<div className="suspenseLoading">Loading...</div>} persistor={persistor}>
        <Header
          navItems={[
            { name: "Home", path: "/", icon: <FaHome />, color: "orchid" },
            {
              name: "Account",
              path: "/account",
              icon: <FaUser />,
              color: "deepskyblue",
            },
            {
              name: "Menu",
              path: "/menu",
              icon: <FaUtensils />,
              color: "tomato",
            },
            {
              name: "Payment",
              path: "/payment",
              icon: <FaMoneyCheckAlt />,
              color: "limegreen",
            },
            {
              name: "Login",
              path: "/login",
              icon: <FaSignInAlt />,
              color: "goldenrod",
            },
            {
              name: "Dashboard",
              path: "/Dashboard",
              icon: <FaTachometerAlt />,
              color: "goldenrod",
            },
            {
              name: "Contact",
              path: "/Contact",
              icon: <FaPhone />,
              color: "slateblue",
            },
          ]}
        />
         <ToastContainer />
        <Suspense fallback={<div className="suspenseLoading">Loading...</div>}>
          <AnimatePresence mode="sync" initial={false}>
            {children}
          </AnimatePresence>
        </Suspense>
        </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
