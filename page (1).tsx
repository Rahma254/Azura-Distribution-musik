"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Music,
  User,
  Calendar,
  DollarSign,
  ArrowLeft,
  Play,
  Download,
  Eye,
  MessageCircle,
  Send,
  Settings,
  BarChart3,
  TrendingUp,
  Globe,
  Headphones,
  Upload,
  Filter,
  Search,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  DistributionAPI,
  DistributionStatus,
  subscribeToDistributionUpdates,
} from "@/lib/distribution/api";

interface MusicSubmission {
  id: string;
  artistName: string;
  artistEmail: string;
  artistPhone: string;
  trackTitle: string;
  albumTitle?: string;
  primaryGenre: string;
  releaseDate: string;
  distributionPackage: string;
  platforms: string[];
  status: "pending_review" | "approved" | "processing" | "live" | "rejected";
  submissionDate: string;
  audioFile: string;
  coverArt: string;
  isrcCode: string;
  royalties: number;
  streams: number;
  revenue: number;
  territories: string[];
  currentPlatformStatus: {
    spotify: "pending" | "live" | "rejected";
    appleMusic: "pending" | "live" | "rejected";
    youtubeMusic: "pending" | "live" | "rejected";
    amazonMusic: "pending" | "live" | "rejected";
    deezer: "pending" | "live" | "rejected";
    tidal: "pending" | "live" | "rejected";
    tiktok: "pending" | "live" | "rejected";
    instagram: "pending" | "live" | "rejected";
  };
}

export default function AdminMusicDistribution() {
  const [submissions, setSubmissions] = useState<MusicSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<MusicSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("distributions"); // 'distributions' or 'social'

  // Social media content management
  const [socialPosts, setSocialPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Demo data - in real app this would come from API
  const demoSubmissions: MusicSubmission[] = [
    {
      id: "1",
      artistName: "Raisa",
      artistEmail: "raisa@email.com",
      artistPhone: "+62 812-3456-7890",
      trackTitle: "Cinta Tak Berpihak",
      albumTitle: "Love Songs Collection",
      primaryGenre: "Indonesian Pop",
      releaseDate: "2024-02-15",
      distributionPackage: "premium",
      platforms: [
        "Spotify",
        "Apple Music",
        "YouTube Music",
        "Amazon Music",
        "Deezer",
        "TikTok",
      ],
      status: "live",
      submissionDate: "2024-01-20",
      audioFile: "raisa-cinta-tak-berpihak.mp3",
      coverArt: "cover-raisa.jpg",
      isrcCode: "ID-A24-21-00001",
      royalties: 15420000,
      streams: 2580000,
      revenue: 18200000,
      territories: ["Indonesia", "Malaysia", "Singapore", "Worldwide"],
      currentPlatformStatus: {
        spotify: "live",
        appleMusic: "live",
        youtubeMusic: "live",
        amazonMusic: "live",
        deezer: "live",
        tidal: "live",
        tiktok: "live",
        instagram: "live",
      },
    },
    {
      id: "2",
      artistName: "Hindia",
      artistEmail: "hindia@email.com",
      artistPhone: "+62 813-7890-1234",
      trackTitle: "Secukupnya",
      primaryGenre: "Indie Pop",
      releaseDate: "2024-02-20",
      distributionPackage: "standard",
      platforms: ["Spotify", "Apple Music", "YouTube Music", "Deezer"],
      status: "processing",
      submissionDate: "2024-02-01",
      audioFile: "hindia-secukupnya.mp3",
      coverArt: "cover-hindia.jpg",
      isrcCode: "ID-A24-21-00002",
      royalties: 0,
      streams: 0,
      revenue: 0,
      territories: ["Indonesia", "Malaysia"],
      currentPlatformStatus: {
        spotify: "pending",
        appleMusic: "pending",
        youtubeMusic: "live",
        amazonMusic: "pending",
        deezer: "pending",
        tidal: "pending",
        tiktok: "pending",
        instagram: "pending",
      },
    },
    {
      id: "3",
      artistName: "The Changcuters",
      artistEmail: "changcuters@email.com",
      artistPhone: "+62 814-5678-9012",
      trackTitle: "Racun Dunia",
      primaryGenre: "Rock",
      releaseDate: "2024-02-25",
      distributionPackage: "unlimited",
      platforms: ["All Platforms"],
      status: "pending_review",
      submissionDate: "2024-02-10",
      audioFile: "changcuters-racun-dunia.mp3",
      coverArt: "cover-changcuters.jpg",
      isrcCode: "ID-A24-21-00003",
      royalties: 0,
      streams: 0,
      revenue: 0,
      territories: ["Worldwide"],
      currentPlatformStatus: {
        spotify: "pending",
        appleMusic: "pending",
        youtubeMusic: "pending",
        amazonMusic: "pending",
        deezer: "pending",
        tidal: "pending",
        tiktok: "pending",
        instagram: "pending",
      },
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubmissions(demoSubmissions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = async (
    submissionId: string,
    newStatus: string,
  ) => {
    try {
      // Update local state
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === submissionId ? { ...sub, status: newStatus as any } : sub,
        ),
      );

      // Simulate API call to update status
      console.log(
        `Updating submission ${submissionId} to status: ${newStatus}`,
      );

      // Send WhatsApp notification to artist
      if (selectedSubmission) {
        const message = `Update: Your track "${selectedSubmission.trackTitle}" status has been changed to ${newStatus.toUpperCase()}. Check your dashboard for details.`;
        const whatsappUrl = `https://wa.me/${selectedSubmission.artistPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      }

      setShowModal(false);
      alert(
        "Status updated successfully! WhatsApp notification sent to artist.",
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDistributeToPlatforms = async (submissionId: string) => {
    try {
      const submission = submissions.find((s) => s.id === submissionId);
      if (!submission) return;

      setLoading(true);

      // Update status to processing
      await handleStatusUpdate(submissionId, "processing");

      // Get enabled platforms from submission
      const enabledPlatforms = Object.keys(
        submission.currentPlatformStatus,
      ).filter(
        (platform) =>
          submission.currentPlatformStatus[
            platform as keyof typeof submission.currentPlatformStatus
          ] === "pending",
      );

      console.log(
        `🚀 Starting REAL distribution to ${enabledPlatforms.length} platforms...`,
      );

      // Start real distribution to each platform
      const distributionPromises = enabledPlatforms.map(async (platform) => {
        try {
          const result = await DistributionAPI.distributeToPlatform(
            submissionId,
            platform,
            {
              trackTitle: submission.trackTitle,
              artistName: submission.artistName,
              albumTitle: submission.albumTitle,
              primaryGenre: submission.primaryGenre,
              releaseDate: submission.releaseDate,
              isrcCode: submission.isrcCode,
              audioFile: submission.audioFile,
              coverArt: submission.coverArt,
              territories: submission.territories,
              artistEmail: submission.artistEmail,
              artistPhone: submission.artistPhone,
              copyrightOwner: `℗ 2024 ${submission.artistName}`,
              language: "Indonesian",
            },
          );

          // Update local state with distribution result
          setSubmissions((prev) =>
            prev.map((sub) =>
              sub.id === submissionId
                ? {
                    ...sub,
                    currentPlatformStatus: {
                      ...sub.currentPlatformStatus,
                      [platform]: result.status as
                        | "pending"
                        | "live"
                        | "rejected",
                    },
                  }
                : sub,
            ),
          );

          console.log(`✅ Distribution to ${platform}:`, result);
          return { platform, result };
        } catch (error) {
          console.error(`❌ Distribution to ${platform} failed:`, error);
          return { platform, error: error.message };
        }
      });

      // Wait for all distributions to complete
      const results = await Promise.allSettled(distributionPromises);

      // Count successful distributions
      const successful = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      // Subscribe to real-time updates for this submission
      const subscription = subscribeToDistributionUpdates(
        submissionId,
        (update) => {
          console.log("📡 Real-time distribution update:", update);

          // Update UI with real-time status changes
          setSubmissions((prev) =>
            prev.map((sub) =>
              sub.id === submissionId
                ? {
                    ...sub,
                    currentPlatformStatus: {
                      ...sub.currentPlatformStatus,
                      [update.new.platform]: update.new.status,
                    },
                    streams:
                      (sub.streams || 0) + (update.new.data?.streams || 0),
                    revenue:
                      (sub.revenue || 0) + (update.new.data?.revenue || 0),
                  }
                : sub,
            ),
          );
        },
      );

      // Store subscription for cleanup
      setTimeout(() => subscription.unsubscribe(), 24 * 60 * 60 * 1000); // 24 hours

      // Send WhatsApp notification to artist with real status
      const message = `🎵 REAL Distribution Started!

Track: "${submission.trackTitle}"
Status: Successfully submitted to ${successful} platforms
${failed > 0 ? `Failed: ${failed} platforms` : ""}

Your music is now being processed by:
${enabledPlatforms.map((p) => `• ${p.charAt(0).toUpperCase() + p.slice(1)}`).join("\n")}

📊 Real-time tracking is active!
Check your artist dashboard for live updates.

You'll be notified when your music goes live on each platform.`;

      const whatsappUrl = `https://wa.me/${submission.artistPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      alert(`🚀 REAL Distribution Initiated!

${successful} platforms successful
${failed > 0 ? `${failed} platforms failed` : ""}

Real-time monitoring is now ACTIVE.
Artist will receive live updates.`);

      setShowModal(false);
    } catch (error) {
      console.error("Distribution error:", error);
      alert("Failed to start distribution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesStatus =
      filterStatus === "all" || submission.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      submission.trackTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.artistName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review":
        return "bg-yellow-600";
      case "approved":
        return "bg-blue-600";
      case "processing":
        return "bg-purple-600";
      case "live":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      spotify: "🎵",
      appleMusic: "🍎",
      youtubeMusic: "📺",
      amazonMusic: "📦",
      deezer: "🎧",
      tidal: "🌊",
      tiktok: "🎪",
      instagram: "📷",
    };
    return icons[platform] || "🎵";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Platform Admin Dashboard
                  </h1>
                  <p className="text-gray-400">
                    Manage music distributions and social media content
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 px-4 py-2 rounded-lg">
                    <span className="text-white font-semibold">
                      {submissions.length}
                    </span>
                    <span className="text-gray-400 ml-1">Distributions</span>
                  </div>
                  <div className="bg-green-600 px-4 py-2 rounded-lg">
                    <span className="text-white font-semibold">156</span>
                    <span className="text-white ml-1">Social Posts</span>
                  </div>
                  <div className="bg-blue-600 px-4 py-2 rounded-lg">
                    <span className="text-white font-semibold">12.5K</span>
                    <span className="text-white ml-1">Total Users</span>
                  </div>
                </div>
              </div>

              {/* Admin Tabs */}
              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => setActiveTab("distributions")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === "distributions"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Music Distributions
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === "social"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Social Media Content
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === "users"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  User Management
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === "analytics"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-500">
                      {
                        submissions.filter((s) => s.status === "pending_review")
                          .length
                      }
                    </p>
                  </div>
                  <Clock className="text-yellow-500" size={32} />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Processing</p>
                    <p className="text-2xl font-bold text-purple-500">
                      {
                        submissions.filter((s) => s.status === "processing")
                          .length
                      }
                    </p>
                  </div>
                  <Upload className="text-purple-500" size={32} />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Live Tracks</p>
                    <p className="text-2xl font-bold text-green-500">
                      {submissions.filter((s) => s.status === "live").length}
                    </p>
                  </div>
                  <Music className="text-green-500" size={32} />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-500">
                      Rp{" "}
                      {submissions
                        .reduce((sum, s) => sum + s.revenue, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="text-green-500" size={32} />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search tracks or artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="processing">Processing</option>
                  <option value="live">Live</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download size={20} />
                <span>Export Report</span>
              </button>
            </div>

            {/* Content Based on Active Tab */}
            {activeTab === "distributions" && (
              <>
                {/* Submissions Table */}
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="text-left p-4 text-white font-semibold">
                            Track Info
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Artist
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Status
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Package
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Platforms
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Revenue
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubmissions.map((submission) => (
                          <tr
                            key={submission.id}
                            className="border-b border-gray-700 hover:bg-gray-750"
                          >
                            <td className="p-4">
                              <div>
                                <h3 className="text-white font-semibold">
                                  {submission.trackTitle}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  {submission.albumTitle || "Single"}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {submission.isrcCode}
                                </p>
                              </div>
                            </td>

                            <td className="p-4">
                              <div>
                                <p className="text-white">
                                  {submission.artistName}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {submission.primaryGenre}
                                </p>
                              </div>
                            </td>

                            <td className="p-4">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(submission.status)}`}
                              >
                                {submission.status
                                  .replace("_", " ")
                                  .toUpperCase()}
                              </span>
                            </td>

                            <td className="p-4">
                              <span className="text-white capitalize">
                                {submission.distributionPackage}
                              </span>
                            </td>

                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(
                                  submission.currentPlatformStatus,
                                )
                                  .slice(0, 4)
                                  .map(([platform, status]) => (
                                    <span
                                      key={platform}
                                      className={`text-xs px-2 py-1 rounded ${
                                        status === "live"
                                          ? "bg-green-600 text-white"
                                          : status === "pending"
                                            ? "bg-yellow-600 text-white"
                                            : "bg-red-600 text-white"
                                      }`}
                                    >
                                      {getPlatformIcon(platform)}
                                    </span>
                                  ))}
                                {Object.keys(submission.currentPlatformStatus)
                                  .length > 4 && (
                                  <span className="text-xs px-2 py-1 rounded bg-gray-600 text-white">
                                    +
                                    {Object.keys(
                                      submission.currentPlatformStatus,
                                    ).length - 4}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="p-4">
                              <div>
                                <p className="text-green-500 font-semibold">
                                  Rp {submission.revenue.toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {submission.streams.toLocaleString()} streams
                                </p>
                              </div>
                            </td>

                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedSubmission(submission);
                                    setShowModal(true);
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </button>

                                {submission.status === "approved" && (
                                  <button
                                    onClick={() =>
                                      handleDistributeToPlatforms(submission.id)
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                                    title="Distribute to Platforms"
                                  >
                                    <Send size={16} />
                                  </button>
                                )}

                                <button
                                  className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                                  title="More Actions"
                                >
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Social Media Content Management */}
            {activeTab === "social" && (
              <div className="space-y-6">
                {/* Social Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Posts</p>
                        <p className="text-2xl font-bold text-white">156</p>
                      </div>
                      <Music className="text-blue-500" size={32} />
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Likes</p>
                        <p className="text-2xl font-bold text-red-500">45.2K</p>
                      </div>
                      <Heart className="text-red-500" size={32} />
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Comments</p>
                        <p className="text-2xl font-bold text-green-500">
                          12.8K
                        </p>
                      </div>
                      <MessageSquare className="text-green-500" size={32} />
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Downloads</p>
                        <p className="text-2xl font-bold text-purple-500">
                          28.1K
                        </p>
                      </div>
                      <Download className="text-purple-500" size={32} />
                    </div>
                  </div>
                </div>

                {/* Social Content Table */}
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white text-lg font-semibold">
                        Social Media Posts
                      </h3>
                      <div className="flex items-center space-x-4">
                        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                          <option>All Posts</option>
                          <option>Audio</option>
                          <option>Video</option>
                          <option>Featured</option>
                          <option>Reported</option>
                        </select>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                          Export Data
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="text-left p-4 text-white font-semibold">
                            Content
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            User
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Type
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Engagement
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Status
                          </th>
                          <th className="text-left p-4 text-white font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Demo social media posts */}
                        <tr className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center text-lg">
                                🎵
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">
                                  Cinta Tak Berpihak
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Audio • 4:05
                                </p>
                                <p className="text-gray-500 text-xs">
                                  Posted 2 days ago
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                                🎤
                              </div>
                              <div>
                                <p className="text-white text-sm">
                                  Raisa Official
                                </p>
                                <p className="text-gray-400 text-xs">
                                  Verified Artist
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              Audio
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-red-400">❤️ 15.4K</span>
                                <span className="text-blue-400">💬 892</span>
                                <span className="text-green-400">↗️ 1.2K</span>
                                <span className="text-purple-400">⬇️ 8.9K</span>
                              </div>
                              <p className="text-gray-400 text-xs">
                                156K views
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                              Live
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
                                title="Feature"
                              >
                                <Star size={16} />
                              </button>
                              <button
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                                title="Remove"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center text-lg">
                                🎬
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">
                                  Secukupnya - Acoustic
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Video • 3:00
                                </p>
                                <p className="text-gray-500 text-xs">
                                  Posted 4 days ago
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                                🎸
                              </div>
                              <div>
                                <p className="text-white text-sm">Hindia</p>
                                <p className="text-gray-400 text-xs">
                                  Indie Artist
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                              Video
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-red-400">❤️ 8.9K</span>
                                <span className="text-blue-400">💬 445</span>
                                <span className="text-green-400">↗️ 678</span>
                                <span className="text-purple-400">⬇️ 3.4K</span>
                              </div>
                              <p className="text-gray-400 text-xs">
                                89.5K views
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                              Live
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
                                title="Feature"
                              >
                                <Star size={16} />
                              </button>
                              <button
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                                title="Remove"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeTab === "users" && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-4">
                  User Management
                </h3>
                <p className="text-gray-400">
                  User management features coming soon...
                </p>
              </div>
            )}

            {/* Analytics */}
            {activeTab === "analytics" && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-white text-xl font-semibold mb-4">
                  Platform Analytics
                </h3>
                <p className="text-gray-400">
                  Advanced analytics dashboard coming soon...
                </p>
              </div>
            )}

            {/* Modal for submission details */}
            {showModal && selectedSubmission && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        Track Details
                      </h2>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Track Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                          Track Information
                        </h3>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="space-y-3">
                            <div>
                              <label className="text-gray-400 text-sm">
                                Title
                              </label>
                              <p className="text-white font-semibold">
                                {selectedSubmission.trackTitle}
                              </p>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                Artist
                              </label>
                              <p className="text-white">
                                {selectedSubmission.artistName}
                              </p>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                Genre
                              </label>
                              <p className="text-white">
                                {selectedSubmission.primaryGenre}
                              </p>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                Release Date
                              </label>
                              <p className="text-white">
                                {selectedSubmission.releaseDate}
                              </p>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                ISRC Code
                              </label>
                              <p className="text-white font-mono">
                                {selectedSubmission.isrcCode}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Artist Contact */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">
                          Artist Contact
                        </h3>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="space-y-3">
                            <div>
                              <label className="text-gray-400 text-sm">
                                Email
                              </label>
                              <p className="text-white">
                                {selectedSubmission.artistEmail}
                              </p>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                WhatsApp
                              </label>
                              <div className="flex items-center space-x-2">
                                <p className="text-white">
                                  {selectedSubmission.artistPhone}
                                </p>
                                <button
                                  onClick={() => {
                                    const message = `Hi ${selectedSubmission.artistName}, regarding your track "${selectedSubmission.trackTitle}" submission...`;
                                    const whatsappUrl = `https://wa.me/${selectedSubmission.artistPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
                                    window.open(whatsappUrl, "_blank");
                                  }}
                                  className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                                  title="Contact via WhatsApp"
                                >
                                  <MessageCircle size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Platform Status */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Platform Distribution Status
                      </h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        {Object.entries(
                          selectedSubmission.currentPlatformStatus,
                        ).map(([platform, status]) => (
                          <div
                            key={platform}
                            className="bg-gray-700 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">
                                  {getPlatformIcon(platform)}
                                </span>
                                <span className="text-white text-sm capitalize">
                                  {platform.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  status === "live"
                                    ? "bg-green-600 text-white"
                                    : status === "pending"
                                      ? "bg-yellow-600 text-white"
                                      : "bg-red-600 text-white"
                                }`}
                              >
                                {status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    {selectedSubmission.status === "live" && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Performance Stats
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <Headphones
                              className="text-blue-500 mx-auto mb-2"
                              size={24}
                            />
                            <p className="text-2xl font-bold text-white">
                              {selectedSubmission.streams.toLocaleString()}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Total Streams
                            </p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <DollarSign
                              className="text-green-500 mx-auto mb-2"
                              size={24}
                            />
                            <p className="text-2xl font-bold text-white">
                              Rp {selectedSubmission.revenue.toLocaleString()}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Total Revenue
                            </p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-4 text-center">
                            <TrendingUp
                              className="text-purple-500 mx-auto mb-2"
                              size={24}
                            />
                            <p className="text-2xl font-bold text-white">
                              Rp {selectedSubmission.royalties.toLocaleString()}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Artist Royalties
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      {selectedSubmission.status === "pending_review" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                selectedSubmission.id,
                                "approved",
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                          >
                            <CheckCircle size={20} />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                selectedSubmission.id,
                                "rejected",
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                          >
                            <XCircle size={20} />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {selectedSubmission.status === "approved" && (
                        <button
                          onClick={() =>
                            handleDistributeToPlatforms(selectedSubmission.id)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                          <Send size={20} />
                          <span>Distribute to Platforms</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const message = `Update: Your track "${selectedSubmission.trackTitle}" is being processed. We'll notify you once it's live on streaming platforms.`;
                          const whatsappUrl = `https://wa.me/${selectedSubmission.artistPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <MessageCircle size={20} />
                        <span>Contact Artist</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
