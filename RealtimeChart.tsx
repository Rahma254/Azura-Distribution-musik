"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Calendar, Globe, Headphones } from "lucide-react";
import { Song } from "@/lib/supabase/client";

interface RealtimeChartProps {
  songs: Song[];
}

export default function RealtimeChart({ songs }: RealtimeChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [platformData, setPlatformData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    generateChartData();
    generatePlatformData();
  }, [songs, timeRange]);

  const generateChartData = () => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const streams = Math.floor(Math.random() * 5000) + 1000;
      const revenue = streams * 15; // ~15 IDR per stream

      data.push({
        date: date.toLocaleDateString("id-ID", {
          month: "short",
          day: "numeric",
        }),
        streams,
        revenue,
        listeners: Math.floor(streams * 0.7),
      });
    }

    setChartData(data);
  };

  const generatePlatformData = () => {
    const platforms = [
      { name: "Spotify", value: 35, color: "#1DB954" },
      { name: "Apple Music", value: 25, color: "#FA57C1" },
      { name: "YouTube Music", value: 20, color: "#FF0000" },
      { name: "Deezer", value: 10, color: "#FEAA2D" },
      { name: "Others", value: 10, color: "#6B7280" },
    ];
    setPlatformData(platforms);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  return (
    <div className="space-y-8">
      {/* Chart Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <TrendingUp className="text-purple-400" size={32} />
          Real-time Analytics
        </h2>
        <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-2 border border-white/10">
          {[
            { value: "7d", label: "7 Days" },
            { value: "30d", label: "30 Days" },
            { value: "90d", label: "90 Days" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                timeRange === option.value
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Headphones className="text-purple-400" size={24} />
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">2,847</p>
          <p className="text-purple-300 text-sm">Listeners Now</p>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-green-400" size={24} />
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
              ↑ 12%
            </span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">45,230</p>
          <p className="text-green-300 text-sm">Today's Streams</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Globe className="text-blue-400" size={24} />
            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
              Global
            </span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">23</p>
          <p className="text-blue-300 text-sm">Countries</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="text-orange-400" size={24} />
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">92%</p>
          <p className="text-orange-300 text-sm">Engagement Rate</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Streams Chart */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Streams Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                }}
                labelStyle={{ color: "#9CA3AF" }}
                formatter={(value: number) => [formatNumber(value), "Streams"]}
              />
              <Line
                type="monotone"
                dataKey="streams"
                stroke="url(#gradient1)"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#8B5CF6" }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) =>
                  formatCurrency(value).replace("Rp", "")
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                }}
                formatter={(value: number) => [
                  formatCurrency(value),
                  "Revenue",
                ]}
              />
              <Bar
                dataKey="revenue"
                fill="url(#gradient2)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Platform Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                }}
                formatter={(value: number) => [`${value}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {platformData.map((platform, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-gray-300 text-sm">{platform.name}</span>
                <span className="text-white font-semibold ml-auto">
                  {platform.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Songs */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Top Performing Songs
          </h3>
          <div className="space-y-4">
            {songs.slice(0, 5).map((song, index) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{song.title}</h4>
                  <p className="text-gray-400 text-sm">{song.genre}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {formatNumber(song.streams)}
                  </p>
                  <p className="text-green-400 text-sm">
                    {formatCurrency(song.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
