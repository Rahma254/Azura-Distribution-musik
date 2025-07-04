"use client";

import { Play, ArrowRight, Music, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-200 px-6 py-3 rounded-full font-semibold mb-8">
          <Music size={20} />
          Platform Distribusi Musik #1 di Indonesia
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Distribusi Musik{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Profesional
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Bagikan musik Anda ke 150+ platform streaming dunia dengan dukungan AI
          canggih dan harga terjangkau
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/register"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Mulai Distribusi
            <ArrowRight size={20} />
          </Link>

          <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
            <Play size={20} />
            Lihat Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
              150+
            </div>
            <div className="text-gray-600">Platform</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
              10K+
            </div>
            <div className="text-gray-600">Artis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
              50M+
            </div>
            <div className="text-gray-600">Streams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
              95%
            </div>
            <div className="text-gray-600">Royalti</div>
          </div>
        </div>

        {/* Platform Logos */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
            <TrendingUp className="text-emerald-600" size={28} />
            Musik Anda akan tersedia di:
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Spotify", color: "bg-green-500" },
              { name: "Apple Music", color: "bg-gray-800" },
              { name: "YouTube Music", color: "bg-red-500" },
              { name: "Deezer", color: "bg-orange-500" },
              { name: "Amazon Music", color: "bg-blue-500" },
              { name: "Tidal", color: "bg-black" },
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${platform.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}
                >
                  <Music className="text-white" size={24} />
                </div>
                <div className="text-gray-800 font-semibold text-sm">
                  {platform.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
