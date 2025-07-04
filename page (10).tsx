"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Play,
  Music,
  TrendingUp,
  Star,
  Upload,
  Plus,
  Heart,
  Share2,
  Download,
  Eye,
  User,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Pause,
  Volume2,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Flag,
  Send,
  UserPlus,
} from "lucide-react";
import ChatBot from "@/components/ChatBot";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  supabase,
  PublicPost,
  PostComment,
  PostLike,
} from "@/lib/supabase/client";

export default function SocialMusicPlatform() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Upload form data
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    genre: "",
    tags: [],
    mediaFile: null as File | null,
    thumbnail: null as File | null,
    isPublic: true,
  });

  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Electronic",
    "Jazz",
    "Classical",
    "Indonesian Pop",
    "Dangdut",
    "Keroncong",
    "Alternative",
    "Indie",
  ];

  const categories = [
    "All",
    "Music",
    "Video",
    "Trending",
    "New",
    "Indonesian",
    "Pop",
    "Rock",
    "Electronic",
  ];

  // Demo data - in real app this would come from Supabase
  const demoPosts: PublicPost[] = [
    {
      id: "1",
      user_id: "user1",
      username: "Raisa Official",
      user_avatar: "🎤",
      title: "Cinta Tak Berpihak - Official Audio",
      description:
        "Single terbaru dari album Love Songs Collection. Sebuah lagu tentang cinta yang rumit dan perasaan yang bertentangan.",
      media_type: "audio",
      media_url: "/audio/raisa-cinta.mp3",
      thumbnail_url: "🎵",
      duration: 245,
      file_size: 8500000,
      genre: "Indonesian Pop",
      tags: ["love", "indonesian", "pop", "raisa"],
      likes_count: 15420,
      comments_count: 892,
      shares_count: 1205,
      downloads_count: 8934,
      views_count: 156000,
      is_public: true,
      featured: true,
      created_at: "2024-02-10T10:30:00Z",
      updated_at: "2024-02-10T10:30:00Z",
    },
    {
      id: "2",
      user_id: "user2",
      username: "Hindia",
      user_avatar: "🎸",
      title: "Secukupnya - Acoustic Version",
      description:
        "Versi akustik dari lagu hit Secukupnya. Direkam di studio rumah dengan setup minimal tapi feelnya maksimal.",
      media_type: "video",
      media_url: "/video/hindia-acoustic.mp4",
      thumbnail_url: "🎬",
      duration: 180,
      file_size: 45000000,
      genre: "Indie",
      tags: ["acoustic", "indie", "hindia", "indonesia"],
      likes_count: 8934,
      comments_count: 445,
      shares_count: 678,
      downloads_count: 3421,
      views_count: 89500,
      is_public: true,
      featured: false,
      created_at: "2024-02-08T15:20:00Z",
      updated_at: "2024-02-08T15:20:00Z",
    },
    {
      id: "3",
      user_id: "user3",
      username: "The Changcuters",
      user_avatar: "🎸",
      title: "Racun Dunia - Live Performance",
      description:
        "Live performance dari The Changcuters di Jakarta Rock Festival 2024. Energy yang luar biasa dari penonton!",
      media_type: "video",
      media_url: "/video/changcuters-live.mp4",
      thumbnail_url: "🎪",
      duration: 320,
      file_size: 78000000,
      genre: "Rock",
      tags: ["rock", "live", "changcuters", "festival"],
      likes_count: 12340,
      comments_count: 789,
      shares_count: 2134,
      downloads_count: 5678,
      views_count: 234000,
      is_public: true,
      featured: true,
      created_at: "2024-02-05T20:15:00Z",
      updated_at: "2024-02-05T20:15:00Z",
    },
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      // In real app, fetch from Supabase
      // const { data, error } = await supabase
      //   .from('public_posts')
      //   .select('*')
      //   .eq('is_public', true)
      //   .order('created_at', { ascending: false });

      // For demo, use static data
      setTimeout(() => {
        setPosts(demoPosts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error loading posts:", error);
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadData.mediaFile) {
      alert("Please select a media file");
      return;
    }

    try {
      setLoading(true);

      // In real app, upload to Supabase storage
      const fileName = `${Date.now()}-${uploadData.mediaFile.name}`;

      // Simulate file upload
      console.log("Uploading file:", fileName);

      const newPost: PublicPost = {
        id: Date.now().toString(),
        user_id: "current_user",
        username: "Current User",
        user_avatar: "👤",
        title: uploadData.title,
        description: uploadData.description,
        media_type: uploadData.mediaFile.type.startsWith("video/")
          ? "video"
          : "audio",
        media_url: URL.createObjectURL(uploadData.mediaFile),
        thumbnail_url: uploadData.thumbnail
          ? URL.createObjectURL(uploadData.thumbnail)
          : "🎵",
        duration: 0,
        file_size: uploadData.mediaFile.size,
        genre: uploadData.genre,
        tags: uploadData.tags,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0,
        downloads_count: 0,
        views_count: 0,
        is_public: uploadData.isPublic,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add to posts
      setPosts((prev) => [newPost, ...prev]);

      // Reset form
      setUploadData({
        title: "",
        description: "",
        genre: "",
        tags: [],
        mediaFile: null,
        thumbnail: null,
        isPublic: true,
      });

      setShowUploadModal(false);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      // Update local state
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count + 1 }
            : post,
        ),
      );

      // In real app, save to Supabase
      // await supabase.from('post_likes').insert({ post_id: postId, user_id: currentUser.id });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = (post: PublicPost) => {
    const shareText = `Check out "${post.title}" by ${post.username} on Nabila Music Platform!`;
    const shareUrl = `https://nabila-music.com/post/${post.id}`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Link copied to clipboard!");
    }

    // Update share count
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, shares_count: p.shares_count + 1 } : p,
      ),
    );
  };

  const handleDownload = (post: PublicPost) => {
    // In real app, create download link
    const link = document.createElement("a");
    link.href = post.media_url;
    link.download = `${post.title}.${post.media_type === "video" ? "mp4" : "mp3"}`;
    link.click();

    // Update download count
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, downloads_count: p.downloads_count + 1 } : p,
      ),
    );
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) return;

    try {
      // Create new comment object
      const comment = {
        id: Date.now().toString(),
        post_id: postId,
        user_id: "current_user",
        username: "Current User",
        user_avatar: "👤",
        comment: newComment.trim(),
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // In real app, save to Supabase
      // await supabase.from('post_comments').insert(comment);

      // Update post comment count
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments_count: post.comments_count + 1 }
            : post,
        ),
      );

      // Clear comment input
      setNewComment("");

      // Show success message
      console.log("✅ Comment added successfully:", comment);
      alert("💬 Comment posted successfully!");
    } catch (error) {
      console.error("❌ Error adding comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Music" && post.media_type === "audio") ||
      (selectedCategory === "Video" && post.media_type === "video") ||
      post.genre.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase()),
      );

    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading social platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 pt-4">
          <div className="max-w-4xl mx-auto px-6">
            {/* Upload Section */}
            <div className="mb-8">
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="text-gray-300" size={24} />
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-left px-4 py-3 rounded-full transition-colors"
                    >
                      Share your music or video with the world...
                    </button>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search music, videos, artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors">
                  <Filter size={20} />
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                        {post.user_avatar}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {post.username}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {post.featured && (
                        <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-4">
                    <h2 className="text-white text-lg font-semibold mb-2">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-gray-300 mb-4">{post.description}</p>
                    )}

                    {/* Media Player */}
                    <div className="bg-gray-900 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                          {post.thumbnail_url}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                setCurrentlyPlaying(
                                  currentlyPlaying === post.id ? null : post.id,
                                )
                              }
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                            >
                              {currentlyPlaying === post.id ? (
                                <Pause size={20} />
                              ) : (
                                <Play size={20} />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="bg-gray-600 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full w-1/3"></div>
                              </div>
                            </div>
                            <span className="text-gray-400 text-sm">
                              {formatDuration(post.duration || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-gray-400 text-sm mb-4">
                      <span className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{post.views_count.toLocaleString()} views</span>
                      </span>
                      <span>{post.genre}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Heart size={20} />
                          <span>{post.likes_count.toLocaleString()}</span>
                        </button>

                        <button
                          onClick={() =>
                            setShowComments(
                              showComments === post.id ? null : post.id,
                            )
                          }
                          className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <MessageSquare size={20} />
                          <span>{post.comments_count}</span>
                        </button>

                        <button
                          onClick={() => handleShare(post)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors"
                        >
                          <Share2 size={20} />
                          <span>{post.shares_count}</span>
                        </button>

                        <button
                          onClick={() => handleDownload(post)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors"
                        >
                          <Download size={20} />
                          <span>{post.downloads_count}</span>
                        </button>
                      </div>

                      <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                        <Bookmark size={20} />
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments === post.id && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="space-y-3 mb-4">
                          {/* Sample comments */}
                          <div className="flex space-x-3">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                              👤
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-300 text-sm">
                                <span className="font-semibold">User123</span>{" "}
                                Amazing track! Love the melody 🎵
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-gray-500 text-xs">
                                  2h ago
                                </span>
                                <button className="text-gray-500 hover:text-red-500 text-xs">
                                  Like
                                </button>
                                <button className="text-gray-500 hover:text-blue-500 text-xs">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Add Comment */}
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">
                            👤
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && newComment.trim()) {
                                  handleAddComment(post.id);
                                }
                              }}
                              className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            />
                          </div>
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment.trim()}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                Load More Posts
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleFileUpload} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upload Media</h2>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadData.title}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    placeholder="Enter title for your upload"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    placeholder="Describe your upload..."
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Media File *
                  </label>
                  <input
                    type="file"
                    required
                    accept="audio/*,video/*"
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        mediaFile: e.target.files?.[0] || null,
                      }))
                    }
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    Supported: MP3, WAV, MP4, MOV (Max 100MB)
                  </p>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Thumbnail (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        thumbnail: e.target.files?.[0] || null,
                      }))
                    }
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Genre
                  </label>
                  <select
                    value={uploadData.genre}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        genre: e.target.value,
                      }))
                    }
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  >
                    <option value="">Select genre</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={uploadData.isPublic}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        isPublic: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="isPublic" className="text-white">
                    Make this upload public
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!uploadData.title || !uploadData.mediaFile}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Chat Bot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
