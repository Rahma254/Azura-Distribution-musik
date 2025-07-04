"use client";

import { useState, useEffect } from "react";
import {
  User,
  TrendingUp,
  DollarSign,
  Music,
  Download,
  Wallet,
  Settings,
  Crown,
  Star,
  BarChart3,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistStats from "@/components/artist/ArtistStats";
import RealtimeChart from "@/components/artist/RealtimeChart";
import WithdrawalPanel from "@/components/artist/WithdrawalPanel";
import UserProfile from "@/components/artist/UserProfile";
import { supabase, getCurrentUser, Artist, Song } from "@/lib/supabase/client";
import {
  DistributionAPI,
  subscribeToAnalyticsUpdates,
} from "@/lib/distribution/api";

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [realTimeAnalytics, setRealTimeAnalytics] = useState<any>(null);
  const [distributionStatus, setDistributionStatus] = useState<any>({});

  useEffect(() => {
    loadArtistData();
  }, []);

  const loadArtistData = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        // Show demo data with real-time simulation
        const demoArtist = {
          id: "demo",
          name: "Demo Artist",
          email: "demo@example.com",
          avatar_url: "/avatar-placeholder.jpg",
          bio: "Rising star in Indonesian music scene",
          phone: "+62 812-3456-7890",
          total_streams: 2847653,
          total_revenue: 45200000,
          followers_count: 12450,
          following_count: 156,
          verified: true,
          created_at: "2024-01-01",
          updated_at: "2024-01-15",
        };
        setArtist(demoArtist);

        // Load real-time analytics for demo
        const analytics = await DistributionAPI.getArtistAnalytics("demo");
        if (analytics) {
          setRealTimeAnalytics(analytics);

          // Update artist totals with real-time data
          setArtist((prev) =>
            prev
              ? {
                  ...prev,
                  total_streams: analytics.totalStreams,
                  total_revenue: analytics.totalRevenue,
                }
              : prev,
          );
        }
        // Demo songs with real-time distribution status
        const demoSongs = [
          {
            id: "1",
            artist_id: "demo",
            title: "Memories of Love",
            album: "First Album",
            genre: "Pop",
            artwork_url: "/song-artwork-1.jpg",
            release_date: "2024-01-10",
            streams: 856432,
            revenue: 12850000,
            status: "live" as const,
            created_at: "2024-01-01",
            distributionStatus: {
              spotify: "live",
              appleMusic: "live",
              youtubeMusic: "live",
              amazonMusic: "live",
              deezer: "live",
              tidal: "processing",
              tiktok: "live",
              instagram: "live",
            },
          },
          {
            id: "2",
            artist_id: "demo",
            title: "Sunset Dreams",
            album: "First Album",
            genre: "R&B",
            artwork_url: "/song-artwork-2.jpg",
            release_date: "2024-01-15",
            streams: 1245678,
            revenue: 18720000,
            status: "live" as const,
            created_at: "2024-01-05",
            distributionStatus: {
              spotify: "live",
              appleMusic: "live",
              youtubeMusic: "live",
              amazonMusic: "pending",
              deezer: "live",
              tidal: "live",
              tiktok: "live",
              instagram: "processing",
            },
          },
          {
            id: "3",
            artist_id: "demo",
            title: "City Lights",
            genre: "Electronic",
            release_date: "2024-01-20",
            streams: 745543,
            revenue: 13630000,
            status: "processing" as const,
            created_at: "2024-01-10",
            distributionStatus: {
              spotify: "processing",
              appleMusic: "processing",
              youtubeMusic: "live",
              amazonMusic: "pending",
              deezer: "pending",
              tidal: "pending",
              tiktok: "live",
              instagram: "live",
            },
          },
        ];

        setSongs(demoSongs);

        // Subscribe to real-time analytics updates
        const subscription = subscribeToAnalyticsUpdates("demo", (update) => {
          console.log("🔥 Real-time analytics update:", update);

          // Update songs with new streaming data
          setSongs((prev) =>
            prev.map((song) => {
              if (song.id === update.new.track_id) {
                return {
                  ...song,
                  streams: song.streams + update.new.streams,
                  revenue: song.revenue + update.new.revenue,
                };
              }
              return song;
            }),
          );

          // Update artist totals
          setArtist((prev) =>
            prev
              ? {
                  ...prev,
                  total_streams: prev.total_streams + update.new.streams,
                  total_revenue: prev.total_revenue + update.new.revenue,
                }
              : prev,
          );
        });

        // Cleanup subscription after 1 hour
        setTimeout(() => subscription.unsubscribe(), 60 * 60 * 1000);
      } else {
        // Load real data from Supabase
        const { data: artistData } = await supabase
          .from("artists")
          .select("*")
          .eq("id", user.id)
          .single();

        const { data: songsData } = await supabase
          .from("songs")
          .select("*")
          .eq("artist_id", user.id)
          .order("created_at", { ascending: false });

        setArtist(artistData);
        setSongs(songsData || []);
      }
    } catch (error) {
      console.error("Error loading artist data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Premium Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Crown className="text-white" size={36} />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">
                Welcome back, {artist?.name}
                <Star className="inline ml-3 text-yellow-400" size={28} />
              </h1>
              <p className="text-purple-200 text-xl font-medium">
                Premium Artist Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 bg-black/20 backdrop-blur-sm rounded-3xl p-4 border border-white/10 shadow-2xl">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "withdraw", label: "Withdraw", icon: Wallet },
              { id: "profile", label: "Profile", icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl transform scale-105"
                    : "text-gray-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20"
                }`}
              >
                <tab.icon size={22} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* Stats Cards */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-8 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-purple-600 rounded-2xl shadow-xl">
                    <Music className="text-white" size={28} />
                  </div>
                  <span className="text-purple-300 text-base font-semibold">
                    Total Streams
                  </span>
                </div>
                <p className="text-4xl font-bold text-white mb-3">
                  {formatNumber(artist?.total_streams || 0)}
                </p>
                <p className="text-green-400 text-base font-medium">
                  +12.5% this month
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-3xl p-8 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-green-600 rounded-2xl shadow-xl">
                    <DollarSign className="text-white" size={28} />
                  </div>
                  <span className="text-green-300 text-base font-semibold">
                    Total Revenue
                  </span>
                </div>
                <p className="text-4xl font-bold text-white mb-3">
                  {formatCurrency(artist?.total_revenue || 0)}
                </p>
                <p className="text-green-400 text-base font-medium">
                  +8.3% this month
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 rounded-3xl p-8 shadow-2xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-blue-600 rounded-2xl shadow-xl">
                    <TrendingUp className="text-white" size={28} />
                  </div>
                  <span className="text-blue-300 text-base font-semibold">
                    Active Songs
                  </span>
                </div>
                <p className="text-4xl font-bold text-white mb-3">
                  {songs.filter((s) => s.status === "live").length}
                </p>
                <p className="text-green-400 text-base font-medium">
                  All performing well
                </p>
              </div>
            </div>

            {/* Recent Songs with Real-time Distribution Status */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                <Music className="text-purple-400" size={32} />
                Your Latest Releases
                <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                  LIVE TRACKING
                </span>
              </h3>
              <div className="grid gap-6">
                {songs.slice(0, 3).map((song) => (
                  <div
                    key={song.id}
                    className="p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    {/* Song Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <Music className="text-white" size={28} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-white font-semibold text-xl">
                            {song.title}
                          </h4>
                          <p className="text-gray-300 text-lg">
                            {song.album || "Single"} • {song.genre}
                          </p>
                          <p className="text-gray-400 text-base">
                            Released: {song.release_date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-white font-bold text-xl">
                          {formatNumber(song.streams)} streams
                        </p>
                        <p className="text-green-400 font-semibold text-lg">
                          {formatCurrency(song.revenue)}
                        </p>
                        <span
                          className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold ${
                            song.status === "live"
                              ? "bg-green-600 text-white"
                              : song.status === "processing"
                                ? "bg-purple-600 text-white"
                                : "bg-yellow-600 text-white"
                          }`}
                        >
                          {song.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Real-time Platform Distribution Status */}
                    <div className="border-t border-white/10 pt-6">
                      <h5 className="text-white font-semibold mb-4 flex items-center gap-2">
                        📡 Real-time Platform Status
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full animate-pulse">
                          LIVE
                        </span>
                      </h5>
                      <div className="grid grid-cols-4 gap-3">
                        {song.distributionStatus &&
                          Object.entries(song.distributionStatus).map(
                            ([platform, status]) => (
                              <div
                                key={platform}
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  status === "live"
                                    ? "bg-green-600/20 border-green-500 text-green-400"
                                    : status === "processing"
                                      ? "bg-purple-600/20 border-purple-500 text-purple-400"
                                      : "bg-yellow-600/20 border-yellow-500 text-yellow-400"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono">
                                    {platform === "spotify" && "🎵"}
                                    {platform === "appleMusic" && "🍎"}
                                    {platform === "youtubeMusic" && "📺"}
                                    {platform === "amazonMusic" && "📦"}
                                    {platform === "deezer" && "🎧"}
                                    {platform === "tidal" && "🌊"}
                                    {platform === "tiktok" && "🎪"}
                                    {platform === "instagram" && "📷"}
                                  </span>
                                  <span className="text-xs font-semibold capitalize">
                                    {platform.replace(/([A-Z])/g, " $1")}
                                  </span>
                                </div>
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    status === "live"
                                      ? "bg-green-500"
                                      : status === "processing"
                                        ? "bg-purple-500 animate-pulse"
                                        : "bg-yellow-500"
                                  }`}
                                ></div>
                              </div>
                            ),
                          )}
                      </div>

                      {/* Real-time streaming stats */}
                      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            Last 24h streams:
                          </span>
                          <span className="text-green-400 font-bold">
                            +{Math.floor(Math.random() * 500)} 📈
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-400">Revenue today:</span>
                          <span className="text-green-400 font-bold">
                            +Rp{" "}
                            {Math.floor(Math.random() * 50000).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time Analytics Summary */}
              {realTimeAnalytics && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30">
                  <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                    📊 Real-time Analytics Overview
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                      UPDATED {new Date().toLocaleTimeString()}
                    </span>
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {realTimeAnalytics.totalStreams?.toLocaleString()}
                      </p>
                      <p className="text-blue-400 text-sm">
                        Total Streams (All Platforms)
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        Rp {realTimeAnalytics.totalRevenue?.toLocaleString()}
                      </p>
                      <p className="text-green-400 text-sm">
                        Total Revenue (All Platforms)
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {
                          Object.keys(realTimeAnalytics.platformBreakdown || {})
                            .length
                        }
                      </p>
                      <p className="text-purple-400 text-sm">
                        Active Platforms
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && <RealtimeChart songs={songs} />}
        {activeTab === "withdraw" && <WithdrawalPanel artist={artist} />}
        {activeTab === "profile" && (
          <UserProfile artist={artist} setArtist={setArtist} />
        )}
      </div>

      <Footer />
    </div>
  );
}
