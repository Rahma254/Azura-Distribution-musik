"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  ArrowLeft,
  Chrome,
  User,
  Music,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "@/lib/auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signInWithEmail(
          formData.email,
          formData.password,
        );
        if (error) {
          alert(`Login Error: ${error.message}`);
        } else if (data.user) {
          router.push("/artist");
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }

        const { data, error } = await signUpWithEmail(
          formData.email,
          formData.password,
          {
            name: formData.name,
            role: "artist",
          },
        );

        if (error) {
          alert(`Sign Up Error: ${error.message}`);
        } else {
          alert(
            "Registration successful! Please check your email to verify your account.",
          );
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-8 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-emerald-600 hover:text-emerald-700 mb-16 font-semibold text-xl transition-all duration-200 hover:gap-4"
        >
          <ArrowLeft size={24} />
          Kembali ke Beranda
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-emerald-100 rounded-3xl p-12 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="relative inline-block mb-8">
                <div className="w-28 h-28 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
                  <Music className="text-white" size={40} />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {isLogin ? "Selamat Datang Kembali" : "Bergabung dengan Kami"}
              </h1>
              <p className="text-gray-600 text-xl font-medium">
                {isLogin
                  ? "Akses dashboard artis Anda"
                  : "Mulai karir musik profesional Anda"}
              </p>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 bg-white hover:bg-gray-50 text-gray-900 p-5 rounded-2xl font-semibold border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200 mb-10 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              <Chrome size={24} />
              <span className="text-lg">
                {loading
                  ? "Loading..."
                  : `${isLogin ? "Masuk" : "Daftar"} dengan Google`}
              </span>
            </button>

            {/* Divider */}
            <div className="relative mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-8 bg-white text-gray-500 font-semibold">
                  atau
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-8">
              {!isLogin && (
                <div>
                  <label className="block text-gray-900 font-bold mb-4 text-base">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={22}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-14 pr-6 py-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-900 font-bold mb-4 text-base">
                  Email *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={22}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-14 pr-6 py-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-4 text-base">
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={22}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-14 pr-6 py-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-lg"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-900 font-semibold mb-3 text-sm">
                    Konfirmasi Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 shadow-lg text-lg"
              >
                {loading
                  ? "Loading..."
                  : isLogin
                    ? "Masuk ke Dashboard"
                    : "Daftar Sekarang"}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 hover:text-purple-700 font-bold ml-2 transition-colors"
                >
                  {isLogin ? "Daftar di sini" : "Masuk di sini"}
                </button>
              </p>
            </div>

            {/* Admin Access */}
            <div className="text-center mt-6">
              <Link
                href="/admin"
                className="text-gray-500 hover:text-gray-600 text-sm transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
