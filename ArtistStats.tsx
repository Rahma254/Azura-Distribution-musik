"use client";

import {
  TrendingUp,
  Users,
  DollarSign,
  Music,
  Award,
  Globe,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  gradient: string;
  changeType: "positive" | "negative" | "neutral";
}

function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  changeType,
}: StatsCardProps) {
  const changeColor =
    changeType === "positive"
      ? "text-green-400"
      : changeType === "negative"
        ? "text-red-400"
        : "text-gray-400";

  return (
    <div
      className={`${gradient} backdrop-blur-sm border border-white/20 rounded-2xl p-8 premium-shadow hover:scale-105 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
          <Icon size={28} className="text-white" />
        </div>
        <span className="text-white/70 text-sm font-medium">{title}</span>
      </div>
      <p className="text-4xl font-bold text-white mb-3 tracking-tight">
        {value}
      </p>
      <p
        className={`${changeColor} text-sm font-medium flex items-center gap-1`}
      >
        {changeType === "positive" && <TrendingUp size={14} />}
        {change}
      </p>
    </div>
  );
}

export default function ArtistStats() {
  const stats = [
    {
      title: "Total Streams",
      value: "2.8M",
      change: "+12.5% this month",
      icon: Music,
      gradient: "bg-gradient-to-br from-purple-600/30 to-violet-600/30",
      changeType: "positive" as const,
    },
    {
      title: "Monthly Revenue",
      value: "Rp 45.2M",
      change: "+8.3% from last month",
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-green-600/30 to-emerald-600/30",
      changeType: "positive" as const,
    },
    {
      title: "Active Listeners",
      value: "156K",
      change: "+15.7% growth",
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-600/30 to-cyan-600/30",
      changeType: "positive" as const,
    },
    {
      title: "Countries Reached",
      value: "23",
      change: "2 new this month",
      icon: Globe,
      gradient: "bg-gradient-to-br from-orange-600/30 to-red-600/30",
      changeType: "positive" as const,
    },
    {
      title: "Chart Positions",
      value: "#12",
      change: "Highest position",
      icon: Award,
      gradient: "bg-gradient-to-br from-yellow-600/30 to-orange-600/30",
      changeType: "positive" as const,
    },
    {
      title: "Playlist Adds",
      value: "1.2K",
      change: "+45% this week",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-pink-600/30 to-rose-600/30",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
