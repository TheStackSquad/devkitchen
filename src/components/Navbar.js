// src/app/components/Header.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { navVariants, menuVariants } from "@/components/motion/dropdown";
import "@/styles/componentStyle/Header.css";

const Header = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-wrapper">
          <Link href="/" className="logo">
            devKitchen
          </Link>

          <div className='icons-container'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
          >
            <svg
              className="menu-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="cart-icon">
          <Link href="/Checkout">
      <FaShoppingCart style={{ cursor: "pointer" }} />
    </Link>
    </div>
          </div>
        </div>

        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="mobile-dropdown"
        >
          <motion.div variants={navVariants} className="mobile-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`mobile-nav-link ${
                  pathname === item.path ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* Apply the color to the icon */}
                <span
                  style={{
                    color: item.color,
                    fontSize: "20px",
                    marginRight: "8px",
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
