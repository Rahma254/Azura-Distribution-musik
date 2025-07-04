"use client";

import {
  Globe,
  TrendingUp,
  Shield,
  Users,
  Headphones,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Distribusi Global",
    description:
      "Bagikan musik Anda ke 150+ platform streaming di seluruh dunia termasuk Spotify, Apple Music, YouTube Music, dan lainnya.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: TrendingUp,
    title: "Analytics Mendalam",
    description:
      "Dapatkan laporan detail tentang performa musik Anda dengan data streaming, royalti, dan demografi pendengar.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: Shield,
    title: "Perlindungan Hak Cipta",
    description:
      "Sistem keamanan tingkat tinggi untuk melindungi hak cipta dan mencegah pembajakan musik Anda.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Management Support",
    description:
      "Tim support profesional dan AI canggih siap membantu 24/7 untuk semua kebutuhan distribusi musik Anda.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Headphones,
    title: "Kualitas Audio Tinggi",
    description:
      "Dukungan format audio berkualitas tinggi hingga 24-bit/192kHz untuk pengalaman mendengar terbaik.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Proses Cepat",
    description:
      "Musik Anda akan live di platform streaming dalam 1-3 hari kerja dengan proses otomatis yang efisien.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fitur Unggulan Platform
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mendistribusikan musik secara
            profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className={feature.color} size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
