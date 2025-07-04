"use client";

import {
  Home,
  TrendingUp,
  Music,
  PlayCircle,
  Clock,
  ThumbsUp,
  Settings,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 h-screen overflow-y-auto border-r border-gray-800 fixed left-0 top-14 z-30">
      <div className="p-3">
        {/* Main Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center space-x-4 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors mb-1"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            href="/trending"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <TrendingUp size={20} />
            <span>Trending</span>
          </Link>

          <Link
            href="/artist"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Music size={20} />
            <span>Your Music</span>
          </Link>
        </div>

        <div className="border-t border-gray-800 pt-4 mb-6">
          <h3 className="text-gray-400 text-sm font-medium mb-3 px-3">
            LIBRARY
          </h3>

          <Link
            href="/history"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <Clock size={20} />
            <span>History</span>
          </Link>

          <Link
            href="/liked"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <ThumbsUp size={20} />
            <span>Liked songs</span>
          </Link>

          <Link
            href="/playlists"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <PlayCircle size={20} />
            <span>Playlists</span>
          </Link>
        </div>

        <div className="border-t border-gray-800 pt-4 mb-6">
          <h3 className="text-gray-400 text-sm font-medium mb-3 px-3">
            FOR ARTISTS
          </h3>

          <Link
            href="/submit"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <span className="text-lg">⬆️</span>
            <span>Upload Music</span>
          </Link>

          <Link
            href="/register"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <span className="text-lg">👤</span>
            <span>Become Artist</span>
          </Link>

          <Link
            href="/pricing"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <span className="text-lg">💰</span>
            <span>Pricing Plans</span>
          </Link>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-gray-400 text-sm font-medium mb-3 px-3">MORE</h3>

          <Link
            href="/admin"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <Settings size={20} />
            <span>Admin Panel</span>
          </Link>

          <Link
            href="/contracts"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mb-1"
          >
            <span className="text-lg">📄</span>
            <span>Contracts</span>
          </Link>

          <Link
            href="/help"
            className="flex items-center space-x-4 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <HelpCircle size={20} />
            <span>Help & Support</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-4 mt-6">
          <div className="px-3 text-xs text-gray-500 space-y-1">
            <p>About Press Copyright</p>
            <p>Contact us Creators</p>
            <p>Advertise Developers</p>
            <p>Terms Privacy Policy & Safety</p>
            <p className="pt-2">© 2024 Nabila Ahmad Studio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
