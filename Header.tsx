"use client";

import {
  Music,
  Menu,
  Search,
  Bell,
  Settings,
  User,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 h-14">
      <div className="flex items-center h-full px-4">
        {/* Left section: Hamburger + Logo */}
        <div className="flex items-center">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg mr-4 transition-colors"
          >
            <Menu className="text-white" size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
              <Music className="text-white" size={16} />
            </div>
            <span className="text-white text-xl font-semibold hidden sm:block">
              Nabila Music
            </span>
          </Link>
        </div>

        {/* Center section: Search */}
        <div className="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
          <div className="flex w-full max-w-lg">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search songs, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-l-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="bg-gray-800 border border-l-0 border-gray-700 rounded-r-full px-6 hover:bg-gray-700 transition-colors">
              <Search className="text-gray-400" size={20} />
            </button>
          </div>
        </div>

        {/* Right section: Menu items + Profile */}
        <div className="flex items-center space-x-2">
          {/* Create/Upload button */}
          <Link
            href="/submit"
            className="hidden md:flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-2xl">+</span>
            <span className="text-sm">Upload</span>
          </Link>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="text-white" size={20} />
          </button>

          {/* Apps menu */}
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <MoreVertical className="text-white" size={20} />
          </button>

          {/* Sign in button */}
          <Link
            href="/login"
            className="flex items-center space-x-2 border border-gray-600 hover:bg-gray-800 text-blue-400 px-3 py-1.5 rounded-full transition-colors"
          >
            <User size={18} />
            <span className="text-sm">Sign in</span>
          </Link>
        </div>
      </div>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 bg-gray-900 h-full overflow-y-auto">
            <div className="p-4">
              {/* Logo in sidebar */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                  <Music className="text-white" size={16} />
                </div>
                <span className="text-white text-xl font-semibold">
                  Nabila Music
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🏠</span>
                  <span>Home</span>
                </Link>

                <Link
                  href="/artist"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>📊</span>
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/submit"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>⬆️</span>
                  <span>Upload Music</span>
                </Link>

                <div className="border-t border-gray-800 my-4"></div>

                <Link
                  href="/pricing"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>💰</span>
                  <span>Pricing</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>👤</span>
                  <span>Become Artist</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>⚙️</span>
                  <span>Admin Panel</span>
                </Link>

                <Link
                  href="/contracts"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>📄</span>
                  <span>Contracts</span>
                </Link>

                <div className="border-t border-gray-800 my-4"></div>

                <Link
                  href="/settings"
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
