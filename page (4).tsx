"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Music,
  Download,
  ArrowLeft,
  Eye,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data untuk demo
const mockData = {
  totalStreams: 1234567,
  totalRoyalties: 15750000,
  activeSongs: 28,
  platforms: 12,
  recentReleases: [
    {
      title: "Memories of You",
      artist: "John Doe",
      releaseDate: "2024-01-15",
      streams: 45230,
      revenue: 1250000,
      status: "active",
    },
    {
      title: "Summer Nights",
      artist: "Jane Smith",
      releaseDate: "2024-01-10",
      streams: 32150,
      revenue: 890000,
      status: "active",
    },
    {
      title: "City Lights",
      artist: "The Band",
      releaseDate: "2024-01-05",
      streams: 67890,
      revenue: 1875000,
      status: "processing",
    },
  ],
  topPlatforms: [
    { name: "Spotify", streams: 456789, percentage: 37 },
    { name: "Apple Music", streams: 234567, percentage: 19 },
    { name: "YouTube Music", streams: 198765, percentage: 16 },
    { name: "Deezer", streams: 123456, percentage: 10 },
    { name: "Others", streams: 221990, percentage: 18 },
  ],
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.email === "jesikamahjong@gmail.com" &&
      credentials.password === "axis2019"
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Email atau password salah!");
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h1 className="text-2xl font-bold text-white mb-6 text-center">
                Login Dashboard Admin
              </h1>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Email Admin
                  </label>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="jesikamahjong@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Login Dashboard
                </button>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  Demo credentials:
                  <br />
                  Email: jesikamahjong@gmail.com
                  <br />
                  Password: axis2019
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-white hover:text-purple-400 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-300">
            Kelola seluruh aktivitas distribusi musik dan pembayaran
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(mockData.totalStreams)}
                </p>
              </div>
              <BarChart3 className="text-purple-400" size={32} />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Royalti</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(mockData.totalRoyalties)}
                </p>
              </div>
              <DollarSign className="text-green-400" size={32} />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Lagu Aktif</p>
                <p className="text-2xl font-bold text-white">
                  {mockData.activeSongs}
                </p>
              </div>
              <Music className="text-blue-400" size={32} />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Platform</p>
                <p className="text-2xl font-bold text-white">
                  {mockData.platforms}
                </p>
              </div>
              <Users className="text-orange-400" size={32} />
            </div>
          </div>
        </div>

        {/* Recent Releases */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Rilis Terbaru
            </h3>
            <div className="space-y-4">
              {mockData.recentReleases.map((release, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div>
                    <h4 className="text-white font-medium">{release.title}</h4>
                    <p className="text-gray-300 text-sm">{release.artist}</p>
                    <p className="text-gray-400 text-xs">
                      {release.releaseDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {formatNumber(release.streams)} streams
                    </p>
                    <p className="text-green-400 text-sm">
                      {formatCurrency(release.revenue)}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        release.status === "active"
                          ? "bg-green-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {release.status === "active" ? "Aktif" : "Proses"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Top Platform
            </h3>
            <div className="space-y-4">
              {mockData.topPlatforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {platform.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{platform.name}</p>
                      <p className="text-gray-300 text-sm">
                        {formatNumber(platform.streams)} streams
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {platform.percentage}%
                    </p>
                    <div className="w-20 h-2 bg-white/20 rounded-full mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                        style={{ width: `${platform.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Aksi Admin</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
              <Download className="text-purple-400" size={24} />
              <div>
                <p className="text-white font-medium">Export Data</p>
                <p className="text-gray-300 text-sm">
                  Download laporan lengkap
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
              <Eye className="text-blue-400" size={24} />
              <div>
                <p className="text-white font-medium">Review Submissions</p>
                <p className="text-gray-300 text-sm">Tinjau pengajuan baru</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left">
              <Settings className="text-green-400" size={24} />
              <div>
                <p className="text-white font-medium">Pengaturan</p>
                <p className="text-gray-300 text-sm">Kelola sistem platform</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
