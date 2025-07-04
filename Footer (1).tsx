"use client";

import { Music, Mail, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Music className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nabila Ahmad Studio</h3>
                <p className="text-gray-400 text-sm">
                  Distribution Music Platform
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Platform distribusi musik terdepan di Indonesia dengan teknologi
              AI canggih untuk mendukung karir musik Anda.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MessageCircle size={16} className="text-emerald-400" />
                <span>WhatsApp: 085810526151</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className="text-teal-400" />
                <span>GoPay: 0895340205302</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} className="text-emerald-400" />
                <span>jesikamahjong@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Daftar Artis
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Submit Musik
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Paket Harga
                </Link>
              </li>
              <li>
                <Link
                  href="/artist"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Dashboard Artis
                </Link>
              </li>
              <li>
                <Link
                  href="/contracts"
                  className="text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Kontrak & Syarat
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Dukungan</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">AI Support 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-300">WhatsApp Support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-gray-300">Email Support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-gray-300">Management Team</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Nabila Ahmad Studio Distribution Music Platform. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Powered by AI Technology & Professional Music Management
          </p>
        </div>
      </div>
    </footer>
  );
}
