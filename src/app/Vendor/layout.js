// src/app/Vendor/layout.js
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import '@/styles/componentStyle/layout.css';

import { 
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaWallet,
  FaHamburger,
  FaChartBar,
  FaTachometerAlt
} from "react-icons/fa";

const navigation = [
  {
    name: "Signup",
    href: "/Vendor/Signup",
    icon: FaUserPlus,
  },
  {
    name: "Login",
    href: "/Vendor/Login",
    icon:  FaSignInAlt,
  },
  {
    name: "Profile",
    href: "/Vendor/Profile",
    icon: FaUser,
  },
  {
    name: "Dashboard",
    href: "/Vendor/Dashboard",
    icon: FaTachometerAlt,
  },
  {
    name: "Payout",
    href: "/Vendor/Payout",
    icon: FaWallet,
  },
  {
    name: "Menu",
    href: "/Vendor/Menu",
    icon: FaHamburger,
  },
  {
    name: "Insights",
    href: "/Vendor/Insights",
    icon: FaChartBar,
  },
];

export default function VendorLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Main content area */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

      {/* Navigation sidebar */}
      <nav className="navGrid fixed bottom-0 left-0 right-0 bg-white border-t md:relative md:w-64 md:border-t-0 md:border-l">
        <ul className="flex md:flex-col p-2 space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors
                    ${isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}