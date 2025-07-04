"use client";

import { ArrowLeft, FileText, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Kontrak & Syarat Ketentuan
            </h1>
            <p className="text-gray-300 text-lg">
              Ketentuan distribusi musik dan perjanjian kerjasama Nabila Ahmad
              Studio
            </p>
          </div>

          {/* Contract Summary */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <FileText className="text-purple-400 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Ringkasan Kontrak
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">
                        Royalti 85-95% untuk artis
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">
                        Distribusi ke 150+ platform global
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">
                        Perlindungan hak cipta penuh
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">Support AI 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">Analytics mendalam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">Pembayaran bulanan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="space-y-8">
            {/* 1. Definisi */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                1. DEFINISI DAN INTERPRETASI
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>"Platform"</strong> merujuk pada Nabila Ahmad Studio
                  Distribution Music Platform.
                </p>
                <p>
                  <strong>"Artis"</strong> merujuk pada pencipta, penyanyi, atau
                  pemegang hak cipta musik.
                </p>
                <p>
                  <strong>"Konten"</strong> merujuk pada rekaman musik, artwork,
                  metadata, dan materi terkait.
                </p>
                <p>
                  <strong>"Distribusi"</strong> merujuk pada penyebaran konten
                  ke platform streaming digital.
                </p>
                <p>
                  <strong>"Royalti"</strong> merujuk pada pendapatan yang
                  diperoleh dari streaming dan penjualan musik.
                </p>
              </div>
            </div>

            {/* 2. Layanan */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                2. LAYANAN DISTRIBUSI
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>2.1 Cakupan Layanan:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Distribusi musik ke platform streaming global (Spotify,
                    Apple Music, YouTube Music, dll.)
                  </li>
                  <li>Pembuatan dan pengelolaan metadata musik</li>
                  <li>
                    Penyediaan ISRC (International Standard Recording Code)
                  </li>
                  <li>Monitoring dan laporan analytics</li>
                  <li>Dukungan teknis dan customer service 24/7</li>
                  <li>Perlindungan hak cipta dan anti-pembajakan</li>
                </ul>

                <p>
                  <strong>2.2 Standar Kualitas:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Audio: Format WAV, MP3, atau FLAC dengan kualitas minimal
                    16-bit/44.1kHz
                  </li>
                  <li>
                    Artwork: Minimal 1400x1400 piksel, format JPG atau PNG
                  </li>
                  <li>Metadata: Lengkap dan akurat sesuai standar industri</li>
                </ul>
              </div>
            </div>

            {/* 3. Hak dan Kewajiban */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                3. HAK DAN KEWAJIBAN
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>3.1 Hak Artis:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Mempertahankan 100% kepemilikan master recording dan hak
                    cipta
                  </li>
                  <li>Menerima royalti sesuai paket yang dipilih (85-95%)</li>
                  <li>Mengakses analytics dan laporan streaming real-time</li>
                  <li>Mengatur jadwal rilis dan metadata</li>
                  <li>
                    Menarik musik dari distribusi dengan pemberitahuan 30 hari
                  </li>
                </ul>

                <p>
                  <strong>3.2 Kewajiban Artis:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Memastikan kepemilikan penuh atau izin legal atas konten
                  </li>
                  <li>
                    Menyediakan konten berkualitas sesuai standar platform
                  </li>
                  <li>Membayar biaya layanan sesuai paket yang dipilih</li>
                  <li>Memberikan informasi yang akurat dan lengkap</li>
                  <li>Mematuhi kebijakan platform streaming tujuan</li>
                </ul>

                <p>
                  <strong>3.3 Hak Platform:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Mendistribusikan konten ke platform yang ditentukan</li>
                  <li>Mengambil fee sesuai paket (5-15% dari royalti)</li>
                  <li>
                    Menolak konten yang tidak memenuhi standar atau melanggar
                    hukum
                  </li>
                  <li>Menghentikan layanan jika terjadi pelanggaran kontrak</li>
                </ul>
              </div>
            </div>

            {/* 4. Pembayaran */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                4. PEMBAYARAN DAN ROYALTI
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>4.1 Struktur Biaya:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Starter: Rp 50.000 per rilis (Royalti 85%)</li>
                  <li>Professional: Rp 150.000 per bulan (Royalti 90%)</li>
                  <li>Label: Rp 500.000 per bulan (Royalti 95%)</li>
                </ul>

                <p>
                  <strong>4.2 Metode Pembayaran Biaya:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>GoPay: 0895340205302 (Admin Nabila Ahmad Studio)</li>
                  <li>Pembayaran harus dilakukan sebelum proses distribusi</li>
                  <li>Bukti pembayaran dikirim via WhatsApp: 085810526151</li>
                </ul>

                <p>
                  <strong>4.3 Pembayaran Royalti:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Royalti dibayarkan setiap bulan (minimal withdraw Rp
                    100.000)
                  </li>
                  <li>Pembayaran melalui transfer bank atau e-wallet</li>
                  <li>Laporan royalti disediakan setiap bulan</li>
                  <li>Keterlambatan pembayaran maksimal 5 hari kerja</li>
                </ul>
              </div>
            </div>

            {/* 5. Hak Cipta */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                5. HAK CIPTA DAN PERLINDUNGAN
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>5.1 Kepemilikan:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Artis mempertahankan 100% kepemilikan master recording
                  </li>
                  <li>Platform tidak mengklaim kepemilikan atas konten</li>
                  <li>
                    Hak distribusi diberikan secara non-eksklusif kepada
                    platform
                  </li>
                </ul>

                <p>
                  <strong>5.2 Perlindungan:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Monitoring aktif terhadap pembajakan dan penggunaan ilegal
                  </li>
                  <li>Sistem Content ID untuk perlindungan di YouTube</li>
                  <li>Bantuan legal untuk kasus pelanggaran hak cipta</li>
                </ul>
              </div>
            </div>

            {/* 6. Terminasi */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                6. TERMINASI KONTRAK
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>6.1 Terminasi oleh Artis:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Dapat mengakhiri kontrak kapan saja dengan pemberitahuan 30
                    hari
                  </li>
                  <li>Musik akan dihapus dari distribusi dalam 30-60 hari</li>
                  <li>Royalti yang belum dibayar akan diselesaikan</li>
                </ul>

                <p>
                  <strong>6.2 Terminasi oleh Platform:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Pelanggaran syarat dan ketentuan</li>
                  <li>Konten ilegal atau melanggar hak cipta</li>
                  <li>Keterlambatan pembayaran lebih dari 30 hari</li>
                  <li>Aktivitas yang merugikan reputasi platform</li>
                </ul>
              </div>
            </div>

            {/* 7. Support */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                7. DUKUNGAN DAN KOMUNIKASI
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>7.1 Saluran Komunikasi:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>WhatsApp Admin: 085810526151 (24/7)</li>
                  <li>Email: jesikamahjong@gmail.com</li>
                  <li>AI Chatbot di website (24/7)</li>
                  <li>Dashboard online untuk tracking</li>
                </ul>

                <p>
                  <strong>7.2 Response Time:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>WhatsApp: Maksimal 2 jam (24/7)</li>
                  <li>Email: Maksimal 24 jam</li>
                  <li>Issues teknis: Maksimal 4 jam</li>
                  <li>Pembayaran royalti: Maksimal 5 hari kerja</li>
                </ul>
              </div>
            </div>

            {/* 8. Legal */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                8. KETENTUAN HUKUM
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>8.1 Yurisdiksi:</strong> Kontrak ini tunduk pada hukum
                  Republik Indonesia.
                </p>
                <p>
                  <strong>8.2 Penyelesaian Sengketa:</strong> Sengketa
                  diselesaikan melalui mediasi atau arbitrase.
                </p>
                <p>
                  <strong>8.3 Force Majeure:</strong> Platform tidak bertanggung
                  jawab atas keterlambatan akibat keadaan kahar.
                </p>
                <p>
                  <strong>8.4 Perubahan Kontrak:</strong> Perubahan kontrak akan
                  diberitahukan 30 hari sebelumnya.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-xl p-8 mt-12">
            <div className="flex items-start gap-4">
              <Shield className="text-purple-400 mt-1" size={32} />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Pertanyaan atau Bantuan?
                </h3>
                <p className="text-gray-300 mb-4">
                  Tim AI dan admin kami siap membantu menjelaskan kontrak dan
                  ketentuan layanan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/6285810526151"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                  >
                    WhatsApp Admin
                  </a>
                  <a
                    href="mailto:jesikamahjong@gmail.com"
                    className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
