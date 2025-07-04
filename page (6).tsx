"use client";

import { Check, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: "50.000",
    period: "per rilis",
    description:
      "Cocok untuk musisi pemula yang ingin mencoba distribusi musik",
    features: [
      "1 lagu per rilis",
      "Distribusi ke 50+ platform streaming",
      "Laporan streaming dasar",
      "Support email standar",
      "Royalti 85% untuk artis",
      "Format audio hingga 320kbps",
      "Metadata dasar",
    ],
    limitations: [
      "Tidak termasuk ISRC code",
      "Laporan bulanan saja",
      "Tidak ada priority support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "150.000",
    period: "per bulan",
    description: "Untuk musisi profesional dan artis yang serius",
    features: [
      "Unlimited rilis musik",
      "Distribusi ke 150+ platform streaming global",
      "Analytics mendalam dan real-time",
      "Support 24/7 + AI Assistant",
      "Royalti 90% untuk artis",
      "Perlindungan hak cipta otomatis",
      "Custom label dan branding",
      "ISRC code gratis",
      "Laporan harian",
      "Format audio hingga 24-bit/192kHz",
      "Pre-order dan release scheduling",
    ],
    limitations: [],
    popular: true,
  },
  {
    name: "Label",
    price: "500.000",
    period: "per bulan",
    description: "Untuk label musik dan manajemen artis profesional",
    features: [
      "Multi-artist management (hingga 50 artis)",
      "White-label platform dengan branding sendiri",
      "Dedicated account manager",
      "Priority support dan konsultasi",
      "Royalti 95% untuk artis",
      "Advanced analytics dan insights",
      "Custom contracts dan splits",
      "Bulk upload tools",
      "API access untuk integrasi",
      "Worldwide distribution network",
      "Marketing tools dan promotion",
      "Revenue tracking per artis",
    ],
    limitations: [],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Paket Harga Distribusi Musik
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan distribusi musik Anda.
            Semua paket termasuk dukungan AI 24/7 dan integrasi WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border-2 rounded-xl p-8 hover:shadow-lg transition-all duration-300 ${
                plan.popular
                  ? "border-emerald-400 scale-105"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    Paling Populer
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  Rp {plan.price}
                  <span className="text-lg text-gray-600 font-normal">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-gray-900 font-semibold mb-4">
                  Yang Anda Dapatkan:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check
                        className="text-emerald-600 mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-gray-500 font-semibold mb-4">Batasan:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="text-gray-500 text-sm">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href="/register"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pilih Paket {plan.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Informasi Pembayaran
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">
                Metode Pembayaran:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    GP
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">GoPay</p>
                    <p className="text-gray-600 text-sm">
                      0895340205302 (Admin)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">
                Proses Pembayaran:
              </h4>
              <ol className="space-y-2 text-gray-600 text-sm">
                <li>1. Transfer ke GoPay 0895340205302</li>
                <li>2. Screenshot bukti pembayaran</li>
                <li>3. Kirim via WhatsApp ke 085810526151</li>
                <li>4. Tunggu konfirmasi admin</li>
                <li>5. Mulai upload musik Anda</li>
              </ol>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>WhatsApp Admin:</strong> 085810526151 |
              <strong> Email:</strong> jesikamahjong@gmail.com
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
