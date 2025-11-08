"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LogIn, UserPlus, LogOut, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; 

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth(); 

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/categories", label: "Categories" },
    { href: "/blood-bank", label: "Blood Bank" },
    { href: "/help", label: "Help" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold text-blue-600">MediConnect</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.label === "Categories" ? "Find Hospital" : item.label}
              </Link>
            ))}
            
            {isAuthenticated && user?.role === 'hospital' && (
              <Link
                href="/hospital-dashboard" 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  pathname === "/hospital-dashboard"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Hospital className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Auth Buttons - Updated */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              // If logged in, show Welcome and Logout
              <>
                <span className="hidden sm:inline text-sm text-gray-700 font-medium">
                  Welcome, {user?.name || 'User'}
                </span>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              // If logged out, show Login/Sign Up
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center space-x-2"
                >
                  {/* Point to the new /auth page */}
                  <Link href="/auth">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                >
                  {/* Point to /auth page, but set mode to signup */}
                  <Link href="/auth?mode=signup">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && user?.role === 'hospital' && (
              <Link
                href="/hospital-dashboard"
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                  pathname === "/hospital-dashboard"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                <Hospital className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}