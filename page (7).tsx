"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  ArrowLeft,
  Chrome,
  User,
  Music,
  Phone,
  MapPin,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signInWithGoogle, signUpWithEmail } from "@/lib/auth";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Artist Info
    artistName: "",
    realName: "",
    genre: "",
    location: "",
    bio: "",

    // Social Media
    instagram: "",
    youtube: "",
    tiktok: "",
    spotify: "",

    // Goals
    goals: "",
    experience: "",
    monthlyBudget: "",
  });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      alert("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Mohon lengkapi semua field yang wajib");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Password tidak cocok");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signUpWithEmail(
        formData.email,
        formData.password,
        {
          name: formData.name,
          artist_name: formData.artistName,
          real_name: formData.realName,
          genre: formData.genre,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          instagram: formData.instagram,
          youtube: formData.youtube,
          tiktok: formData.tiktok,
          spotify: formData.spotify,
          goals: formData.goals,
          experience: formData.experience,
          monthly_budget: formData.monthlyBudget,
          role: "artist",
        },
      );

      if (error) {
        alert(`Registration Error: ${error.message}`);
      } else {
        alert(
          "Registration successful! Please check your email to verify your account.",
        );
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= stepNum
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-20 h-1 mx-2 ${
                        step > stepNum ? "bg-purple-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Info Dasar</span>
              <span>Profil Artis</span>
              <span>Finalisasi</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Music className="text-white" size={32} />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Daftar Sebagai Artis
                  </h1>
                  <p className="text-gray-600">
                    Bergabunglah dengan ribuan artis yang sudah mempercayai
                    platform kami
                  </p>
                </div>

                {/* Google Sign Up */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 p-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 mb-6 disabled:opacity-50"
                >
                  <Chrome size={20} />
                  {loading ? "Loading..." : "Daftar dengan Google"}
                </button>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">atau</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                        placeholder="Nama lengkap Anda"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Konfirmasi Password *
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                        placeholder="••��•••••"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Lanjut ke Profil Artis
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Artist Profile */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Profil Artis Anda
                  </h2>
                  <p className="text-gray-600">
                    Ceritakan tentang diri Anda sebagai artis
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Nama Artis/Panggung *
                    </label>
                    <input
                      type="text"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                      placeholder="Nama yang akan terlihat di platform musik"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        Genre Utama
                      </label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                      >
                        <option value="">Pilih Genre</option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Hip Hop">Hip Hop</option>
                        <option value="R&B">R&B</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Dangdut">Dangdut</option>
                        <option value="Indie">Indie</option>
                        <option value="Other">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        Lokasi
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                          placeholder="Jakarta, Indonesia"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Bio Artis
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                      placeholder="Ceritakan tentang perjalanan musik Anda..."
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Social Media (Opsional)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Instagram
                        </label>
                        <div className="relative">
                          <Instagram
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                            placeholder="@yourusername"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          YouTube
                        </label>
                        <div className="relative">
                          <Youtube
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            type="text"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleInputChange}
                            className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                            placeholder="Channel name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:border-gray-400 transition-all duration-200"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Lanjut ke Finalisasi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Finalization */}
            {step === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Finalisasi Registrasi
                  </h2>
                  <p className="text-gray-600">
                    Langkah terakhir untuk memulai karir musik Anda
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Tujuan Musik Anda
                    </label>
                    <select
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                    >
                      <option value="">Pilih tujuan utama</option>
                      <option value="hobby">Hobi dan Kreativitas</option>
                      <option value="side-income">Penghasilan Tambahan</option>
                      <option value="full-career">Karir Musik Penuh</option>
                      <option value="exposure">Eksposur dan Penggemar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Pengalaman Musik
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                    >
                      <option value="">Pilih level pengalaman</option>
                      <option value="beginner">Pemula (0-1 tahun)</option>
                      <option value="intermediate">Menengah (1-3 tahun)</option>
                      <option value="advanced">Lanjutan (3-5 tahun)</option>
                      <option value="professional">
                        Profesional (5+ tahun)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Budget Bulanan untuk Musik
                    </label>
                    <select
                      name="monthlyBudget"
                      value={formData.monthlyBudget}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                    >
                      <option value="">Pilih range budget</option>
                      <option value="0-100k">Rp 0 - 100.000</option>
                      <option value="100k-500k">Rp 100.000 - 500.000</option>
                      <option value="500k-1m">Rp 500.000 - 1.000.000</option>
                      <option value="1m+">Rp 1.000.000+</option>
                    </select>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Yang Anda Dapatkan:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        Dashboard artis profesional
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        Akses ke sistem distribusi musik
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        Analytics real-time untuk semua rilis
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        Support AI 24/7 dan WhatsApp admin
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        Royalty withdrawal system
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:border-gray-400 transition-all duration-200"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
                    >
                      {loading ? "Mendaftar..." : "Daftar Sekarang"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Login Link */}
            {step === 1 && (
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Login di sini
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
