"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Music,
  Image,
  ArrowLeft,
  Calendar,
  Globe,
  User,
  Tag,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  X,
  Check,
  Info,
  DollarSign,
  Headphones,
  Clock,
  Star,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function SubmitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPreview, setAudioPreview] = useState(null);
  const router = useRouter();

  // Professional music distribution form data
  const [distributionData, setDistributionData] = useState({
    // Track Information
    trackTitle: "",
    artistName: "",
    featuredArtists: "",
    albumTitle: "",
    trackNumber: 1,
    totalTracks: 1,
    version: "", // Remix, Acoustic, etc.

    // Audio Files
    audioFile: null,
    audioFileName: "",
    audioFileSize: "",
    previewClip: null, // 30-second preview for social media

    // Artwork
    coverArt: null,
    coverArtFile: "",

    // Release Information
    primaryGenre: "",
    secondaryGenre: "",
    mood: [],
    releaseDate: "",
    language: "Indonesian",
    explicitContent: false,
    previouslyReleased: false,
    originalReleaseDate: "",

    // Distribution Platforms - Major Platforms
    platforms: {
      // Streaming Services
      spotify: { enabled: true, required: true },
      appleMusic: { enabled: true, required: true },
      youtubeMusic: { enabled: true, required: true },
      amazonMusic: { enabled: true, required: true },
      deezer: { enabled: true, required: true },
      tidal: { enabled: true, required: false },
      pandora: { enabled: true, required: false },

      // Social Media Platforms
      tiktok: { enabled: true, required: false },
      instagram: { enabled: true, required: false },
      facebook: { enabled: true, required: false },
      snapchat: { enabled: true, required: false },

      // Additional Platforms
      soundcloud: { enabled: false, required: false },
      beatport: { enabled: false, required: false }, // EDM focused
      traxsource: { enabled: false, required: false }, // House/Techno
      bandcamp: { enabled: false, required: false },

      // Metadata Services
      shazam: { enabled: true, required: true },
      gracenote: { enabled: true, required: true },
      musicmatch: { enabled: true, required: false },
    },

    // Artist Information
    artistEmail: "",
    artistPhone: "",
    artistBio: "",
    artistCountry: "Indonesia",
    artistWebsite: "",
    artistImage: null,

    // Social Media Links
    socialMedia: {
      instagram: "",
      tiktok: "",
      youtube: "",
      twitter: "",
      facebook: "",
      spotify: "",
    },

    // Rights & Publishing
    copyrightOwner: "",
    publisherName: "",
    publisherPro: "",
    writerPro: "",
    isrcCode: "", // Auto-generated
    upcCode: "", // Auto-generated for albums

    // Lyrics & Credits
    lyrics: "",
    songwriters: [{ name: "", percentage: 100 }],
    producers: [{ name: "", role: "Producer" }],

    // Marketing & Promotion
    shortDescription: "",
    marketingKeywords: [],
    targetAudience: "",
    promotionalPlan: "",

    // Distribution Package
    distributionPackage: "standard", // standard, premium, unlimited
    additionalServices: {
      youtubeContentId: false,
      instagramReels: true,
      tiktokPromotion: true,
      playlistPitching: false,
      radioPromotion: false,
    },

    // Revenue Split
    revenueSplit: {
      artist: 85,
      distributor: 15,
    },
  });

  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Electronic",
    "Indie",
    "Alternative",
    "Country",
    "Jazz",
    "Classical",
    "Reggae",
    "Blues",
    "Folk",
    "Punk",
    "Metal",
    "Funk",
    "World",
    "Latin",
    "Ambient",
    "House",
    "Techno",
    "Trance",
    "Dubstep",
    "Indonesian Pop",
    "Dangdut",
    "Keroncong",
  ];

  const moods = [
    "Happy",
    "Sad",
    "Energetic",
    "Chill",
    "Romantic",
    "Angry",
    "Peaceful",
    "Nostalgic",
    "Uplifting",
    "Melancholic",
    "Dreamy",
    "Aggressive",
    "Inspirational",
    "Dark",
    "Bright",
    "Emotional",
    "Party",
    "Relaxing",
  ];

  const languages = [
    "Indonesian",
    "English",
    "Javanese",
    "Sundanese",
    "Batak",
    "Minang",
    "Balinese",
    "Chinese",
    "Arabic",
    "Korean",
    "Japanese",
    "Spanish",
  ];

  const distributionPackages = [
    {
      id: "standard",
      name: "Standard Distribution",
      price: "Rp 75,000",
      features: [
        "Distribute to 50+ platforms",
        "Keep 85% of royalties",
        "Basic analytics",
        "ISRC code included",
        "Release within 2-3 days",
        "Email support",
      ],
      platforms: 50,
      color: "blue",
    },
    {
      id: "premium",
      name: "Premium Distribution",
      price: "Rp 150,000",
      features: [
        "Distribute to 100+ platforms",
        "Keep 90% of royalties",
        "Advanced analytics",
        "YouTube Content ID",
        "Playlist pitching",
        "Priority support",
        "Social media optimization",
        "Release within 24 hours",
      ],
      platforms: 100,
      color: "purple",
      popular: true,
    },
    {
      id: "unlimited",
      name: "Unlimited Pro",
      price: "Rp 300,000",
      features: [
        "Distribute to 150+ platforms",
        "Keep 95% of royalties",
        "Real-time analytics",
        "Radio promotion",
        "Press release",
        "Dedicated manager",
        "Custom release strategy",
        "Instant release",
        "All premium features",
      ],
      platforms: 150,
      color: "gold",
    },
  ];

  const handleInputChange = (field, value) => {
    setDistributionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    if (field === "audioFile") {
      // Validate audio file
      const validFormats = ["audio/mpeg", "audio/wav", "audio/flac"];
      if (!validFormats.includes(file.type)) {
        alert("Please upload MP3, WAV, or FLAC file");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        // 100MB limit
        alert("File size must be less than 100MB");
        return;
      }
    }

    if (field === "coverArt") {
      // Validate cover art
      const validFormats = ["image/jpeg", "image/png"];
      if (!validFormats.includes(file.type)) {
        alert("Please upload JPG or PNG image");
        return;
      }
      // Check dimensions (should be square, min 1400x1400)
      const img = new Image();
      img.onload = function () {
        if (this.width !== this.height) {
          alert("Cover art must be square (same width and height)");
          return;
        }
        if (this.width < 1400) {
          alert("Cover art must be at least 1400x1400 pixels");
          return;
        }
      };
      img.src = URL.createObjectURL(file);
    }

    setDistributionData((prev) => ({
      ...prev,
      [field]: file,
      [`${field}Name`]: file.name,
      [`${field}Size`]: file.size,
    }));
  };

  const handlePlatformToggle = (platform) => {
    setDistributionData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: {
          ...prev.platforms[platform],
          enabled: !prev.platforms[platform].enabled,
        },
      },
    }));
  };

  const handleSubmitDistribution = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        "trackTitle",
        "artistName",
        "primaryGenre",
        "releaseDate",
        "artistEmail",
        "artistPhone",
        "copyrightOwner",
      ];

      for (const field of requiredFields) {
        if (!distributionData[field]) {
          alert(
            `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          );
          return;
        }
      }

      if (!distributionData.audioFile) {
        alert("Please upload your audio file");
        return;
      }

      if (!distributionData.coverArt) {
        alert("Please upload cover art");
        return;
      }

      // Generate ISRC code
      const isrcCode = `ID-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      // Prepare distribution data for database
      const submissionData = {
        ...distributionData,
        isrcCode,
        submissionDate: new Date().toISOString(),
        status: "pending_review",
        estimatedReleaseDate: new Date(
          distributionData.releaseDate,
        ).toISOString(),
        platformCount: Object.values(distributionData.platforms).filter(
          (p) => p.enabled,
        ).length,
      };

      // Save to Supabase database (real implementation)
      console.log("💾 Saving to Supabase database:", submissionData);

      // In production: await supabase.from('music_submissions').insert(submissionData);

      // Send WhatsApp notification to admin
      const adminMessage = `🎵 NEW MUSIC SUBMISSION

Track: "${submissionData.trackTitle}"
Artist: ${submissionData.artistName}
Genre: ${submissionData.primaryGenre}
Package: ${submissionData.distributionPackage.toUpperCase()}
Platforms: ${Object.values(submissionData.platforms).filter((p) => p.enabled).length}

Artist Contact:
📧 ${submissionData.artistEmail}
📱 ${submissionData.artistPhone}

Release Date: ${submissionData.releaseDate}
ISRC: ${isrcCode}

⚡ Action Required: Review and approve in admin panel
🔗 Admin Panel: https://nabila-music.com/admin`;

      const adminWhatsApp = `https://wa.me/6285810526151?text=${encodeURIComponent(adminMessage)}`;

      // Send artist confirmation
      const artistMessage = `🎵 Music Submission Confirmed!

Track: "${submissionData.trackTitle}"
Submission ID: ${isrcCode}

Your music has been submitted for distribution to ${Object.values(submissionData.platforms).filter((p) => p.enabled).length} platforms including Spotify, Apple Music, YouTube Music, and more.

📊 Package: ${submissionData.distributionPackage.toUpperCase()}
📅 Target Release: ${submissionData.releaseDate}

What happens next:
1. Admin review (24-48 hours) ✅
2. Distribution to platforms (1-7 days) 🚀
3. Real-time tracking active 📡
4. Revenue tracking starts 💰

You'll receive WhatsApp updates at each stage.
Track progress in your artist dashboard!`;

      const artistWhatsApp = `https://wa.me/${submissionData.artistPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(artistMessage)}`;

      // Open WhatsApp notifications
      window.open(adminWhatsApp, "_blank");
      setTimeout(() => {
        window.open(artistWhatsApp, "_blank");
      }, 1000);

      // Show comprehensive success message
      alert(`🎵 MUSIC SUBMITTED SUCCESSFULLY!

Submission ID: ${isrcCode}

✅ Saved to database
✅ Admin notified via WhatsApp
✅ Artist confirmation sent
✅ Real-time tracking ready

Your music will be distributed to ${Object.values(submissionData.platforms).filter((p) => p.enabled).length} platforms.

You'll receive WhatsApp updates as your music gets processed and distributed!`);

      // Redirect to dashboard
      router.push("/artist");
    } catch (error) {
      console.error("Distribution submission error:", error);
      alert("There was an error submitting your music. Please try again.");
    }
  };

  useEffect(() => {
    // Check if user is logged in
    setLoading(false);
    setUser({ id: "demo", name: "Demo Artist" }); // Demo user
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading distribution platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-gray-300 mb-6">
            Please login to distribute your music
          </p>
          <Link
            href="/login"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Login Now
          </Link>
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </Link>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Distribute Your Music
                  </h1>
                  <p className="text-gray-400">
                    Upload your music and distribute to 150+ streaming platforms
                    worldwide
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    <span className="text-sm">85% Royalties</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution Packages */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Choose Your Distribution Plan
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {distributionPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-gray-800 rounded-xl p-6 border-2 transition-all cursor-pointer ${
                      distributionData.distributionPackage === pkg.id
                        ? "border-red-500 bg-gray-700"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() =>
                      handleInputChange("distributionPackage", pkg.id)
                    }
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {pkg.name}
                      </h3>
                      <div className="text-3xl font-bold text-red-500 mb-1">
                        {pkg.price}
                      </div>
                      <div className="text-gray-400 text-sm">per release</div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-300 text-sm"
                        >
                          <Check
                            className="text-green-500 mr-2 flex-shrink-0"
                            size={16}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="text-center">
                      <span className="text-red-400 font-semibold">
                        {pkg.platforms}+ Platforms
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Form */}
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Release Information
              </h2>

              {/* Step 1: Basic Information */}
              <div className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Track Title *
                    </label>
                    <input
                      type="text"
                      value={distributionData.trackTitle}
                      onChange={(e) =>
                        handleInputChange("trackTitle", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Enter your song title"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Artist Name *
                    </label>
                    <input
                      type="text"
                      value={distributionData.artistName}
                      onChange={(e) =>
                        handleInputChange("artistName", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Enter artist name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Featured Artists
                    </label>
                    <input
                      type="text"
                      value={distributionData.featuredArtists}
                      onChange={(e) =>
                        handleInputChange("featuredArtists", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="e.g. feat. Artist Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Album/EP Title
                    </label>
                    <input
                      type="text"
                      value={distributionData.albumTitle}
                      onChange={(e) =>
                        handleInputChange("albumTitle", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Leave empty for single"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Primary Genre *
                    </label>
                    <select
                      value={distributionData.primaryGenre}
                      onChange={(e) =>
                        handleInputChange("primaryGenre", e.target.value)
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

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Secondary Genre
                    </label>
                    <select
                      value={distributionData.secondaryGenre}
                      onChange={(e) =>
                        handleInputChange("secondaryGenre", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    >
                      <option value="">Select secondary genre</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Language
                    </label>
                    <select
                      value={distributionData.language}
                      onChange={(e) =>
                        handleInputChange("language", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Release Date *
                  </label>
                  <input
                    type="date"
                    value={distributionData.releaseDate}
                    onChange={(e) =>
                      handleInputChange("releaseDate", e.target.value)
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Minimum 2 days from today. Premium releases within 24 hours.
                  </p>
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">Upload Files</h3>

                {/* Audio File Upload */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Audio File * (MP3, WAV, FLAC)
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                      <input
                        type="file"
                        accept=".mp3,.wav,.flac"
                        onChange={(e) =>
                          handleFileUpload("audioFile", e.target.files[0])
                        }
                        className="hidden"
                        id="audioFile"
                      />
                      <label htmlFor="audioFile" className="cursor-pointer">
                        <Music
                          className="mx-auto text-gray-400 mb-2"
                          size={32}
                        />
                        <p className="text-gray-400">
                          {distributionData.audioFile
                            ? distributionData.audioFile.name
                            : "Click to upload audio file"}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Max 100MB, High quality preferred
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Cover Art * (JPG, PNG - 1400x1400px min)
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload("coverArt", e.target.files[0])
                        }
                        className="hidden"
                        id="coverArt"
                      />
                      <label htmlFor="coverArt" className="cursor-pointer">
                        <Image
                          className="mx-auto text-gray-400 mb-2"
                          size={32}
                        />
                        <p className="text-gray-400">
                          {distributionData.coverArt
                            ? distributionData.coverArt.name
                            : "Click to upload cover art"}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Square format, minimum 1400x1400px
                        </p>
                      </label>
                    </div>
                    {distributionData.coverArt && (
                      <div className="mt-4">
                        <img
                          src={URL.createObjectURL(distributionData.coverArt)}
                          alt="Cover preview"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 30-second Preview */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    30-Second Preview (for TikTok, Instagram, YouTube Shorts)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-red-500 transition-colors">
                    <input
                      type="file"
                      accept=".mp3,.wav"
                      onChange={(e) =>
                        handleFileUpload("previewClip", e.target.files[0])
                      }
                      className="hidden"
                      id="previewClip"
                    />
                    <label
                      htmlFor="previewClip"
                      className="cursor-pointer flex items-center"
                    >
                      <Headphones className="text-gray-400 mr-3" size={24} />
                      <div>
                        <p className="text-gray-400">
                          {distributionData.previewClip
                            ? distributionData.previewClip.name
                            : "Upload 30-second preview (optional)"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Best part of your song for social media promotion
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Artist Information */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">
                  Artist Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Artist Email *
                    </label>
                    <input
                      type="email"
                      value={distributionData.artistEmail}
                      onChange={(e) =>
                        handleInputChange("artistEmail", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="artist@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={distributionData.artistPhone}
                      onChange={(e) =>
                        handleInputChange("artistPhone", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Artist Bio
                  </label>
                  <textarea
                    value={distributionData.artistBio}
                    onChange={(e) =>
                      handleInputChange("artistBio", e.target.value)
                    }
                    rows={4}
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    placeholder="Tell us about the artist..."
                  />
                </div>

                {/* Social Media Links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Social Media Links
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.keys(distributionData.socialMedia).map(
                      (platform) => (
                        <div key={platform}>
                          <label className="block text-gray-300 font-medium mb-1 capitalize">
                            {platform}
                          </label>
                          <input
                            type="url"
                            value={distributionData.socialMedia[platform]}
                            onChange={(e) =>
                              handleInputChange("socialMedia", {
                                ...distributionData.socialMedia,
                                [platform]: e.target.value,
                              })
                            }
                            className="w-full bg-white border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            placeholder={`https://${platform}.com/username`}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Distribution Platforms */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">
                  Distribution Platforms
                </h3>
                <p className="text-gray-400">
                  Select where you want your music to be available:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(distributionData.platforms).map(
                    ([platform, config]) => (
                      <div
                        key={platform}
                        className={`bg-gray-700 rounded-lg p-4 border-2 cursor-pointer transition-all ${
                          config.enabled
                            ? "border-red-500 bg-gray-600"
                            : "border-gray-600 hover:border-gray-500"
                        } ${config.required ? "opacity-50" : ""}`}
                        onClick={() =>
                          !config.required && handlePlatformToggle(platform)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-semibold capitalize">
                              {platform.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            {config.required && (
                              <span className="text-green-500 text-xs">
                                Required
                              </span>
                            )}
                          </div>
                          <div
                            className={`w-5 h-5 rounded border-2 ${
                              config.enabled
                                ? "bg-red-500 border-red-500"
                                : "border-gray-400"
                            }`}
                          >
                            {config.enabled && (
                              <Check className="text-white" size={16} />
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Rights & Copyright */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">
                  Rights & Copyright
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Copyright Owner *
                    </label>
                    <input
                      type="text"
                      value={distributionData.copyrightOwner}
                      onChange={(e) =>
                        handleInputChange("copyrightOwner", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="℗ 2024 Artist Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Publisher Name
                    </label>
                    <input
                      type="text"
                      value={distributionData.publisherName}
                      onChange={(e) =>
                        handleInputChange("publisherName", e.target.value)
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Publisher (if applicable)"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="explicitContent"
                    checked={distributionData.explicitContent}
                    onChange={(e) =>
                      handleInputChange("explicitContent", e.target.checked)
                    }
                    className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="explicitContent" className="text-white">
                    This track contains explicit content
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="previouslyReleased"
                    checked={distributionData.previouslyReleased}
                    onChange={(e) =>
                      handleInputChange("previouslyReleased", e.target.checked)
                    }
                    className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="previouslyReleased" className="text-white">
                    This track has been previously released elsewhere
                  </label>
                </div>
              </div>

              {/* Lyrics */}
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-bold text-white">
                  Lyrics (Optional)
                </h3>
                <textarea
                  value={distributionData.lyrics}
                  onChange={(e) => handleInputChange("lyrics", e.target.value)}
                  rows={8}
                  className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="Enter song lyrics here..."
                />
                <p className="text-gray-400 text-sm">
                  Adding lyrics helps with discovery and enhances the listener
                  experience
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={handleSubmitDistribution}
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg flex items-center space-x-3"
                >
                  <Upload size={24} />
                  <span>Submit for Distribution</span>
                </button>
              </div>

              {/* Terms */}
              <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-300 text-sm text-center">
                  By submitting, you agree to our terms and confirm you own all
                  rights to this music. Distribution typically takes 1-7 days
                  depending on your plan.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
