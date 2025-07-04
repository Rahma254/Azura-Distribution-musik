"use client";

import { useState } from "react";
import {
  User,
  Camera,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Artist, supabase } from "@/lib/supabase/client";

interface UserProfileProps {
  artist: Artist | null;
  setArtist: (artist: Artist | null) => void;
}

export default function UserProfile({ artist, setArtist }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: artist?.name || "",
    email: artist?.email || "",
    phone: artist?.phone || "",
    bio: artist?.bio || "",
    website: "",
    instagram: "",
    twitter: "",
    youtube: "",
    location: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(artist?.avatar_url || "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Update artist data (in real implementation, this would update Supabase)
      const updatedArtist: Artist = {
        ...artist!,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        avatar_url: avatarPreview,
        updated_at: new Date().toISOString(),
      };

      setArtist(updatedArtist);
      setIsEditing(false);

      // In real implementation:
      // await supabase.from('artists').update(updatedArtist).eq('id', artist.id)
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const stats = [
    { label: "Total Streams", value: "2.8M", icon: User },
    { label: "Monthly Listeners", value: "156K", icon: Globe },
    { label: "Countries", value: "23", icon: MapPin },
    { label: "Songs Released", value: "12", icon: User },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-gray-400" size={48} />
                )}
              </div>
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Artist Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Tell your fans about yourself..."
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {artist?.name}
                </h2>
                <p className="text-gray-300 mb-4">
                  {artist?.bio || "No bio available"}
                </p>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{artist?.email}</span>
                  </div>
                  {artist?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>{artist.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <stat.icon className="text-white" size={24} />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-gray-300 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="text-purple-400" size={24} />
            Contact Information
          </h3>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Jakarta, Indonesia"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-purple-400" size={20} />
                <span className="text-gray-300">{artist?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-purple-400" size={20} />
                <span className="text-gray-300">
                  {artist?.phone || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-purple-400" size={20} />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          )}
        </div>

        {/* Social Media Links */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Globe className="text-purple-400" size={24} />
            Social Media & Links
          </h3>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="@yourusername"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  YouTube
                </label>
                <input
                  type="text"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Your Channel Name"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="text-purple-400" size={20} />
                <span className="text-gray-300">yourwebsite.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="text-purple-400" size={20} />
                <span className="text-gray-300">@yourinstagram</span>
              </div>
              <div className="flex items-center gap-3">
                <Youtube className="text-purple-400" size={20} />
                <span className="text-gray-300">Your YouTube Channel</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Account Status</h4>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-400 font-medium">
                Verified Artist
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 font-medium">Premium Member</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Account Actions</h4>
            <button className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors">
              Change Password
            </button>
            <button className="block w-full text-left text-purple-400 hover:text-purple-300 transition-colors">
              Download Account Data
            </button>
            <button className="block w-full text-left text-red-400 hover:text-red-300 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
