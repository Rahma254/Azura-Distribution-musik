"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const botResponses = {
  greeting:
    "Halo! Saya AI Assistant Nabila Ahmad Studio. Saya siap membantu Anda 24/7 dengan pertanyaan tentang distribusi musik, harga, proses upload, dan semua layanan kami. Bagaimana saya bisa membantu hari ini?",
  pricing:
    "Kami memiliki 3 paket: Starter (Rp 50.000/rilis), Professional (Rp 150.000/bulan), dan Label (Rp 500.000/bulan). Pembayaran melalui GoPay ke 0895340205302. Paket mana yang ingin Anda ketahui lebih detail?",
  upload:
    "Untuk submit musik, silakan kunjungi halaman Submit Musik atau hubungi WhatsApp Admin di 085810526151. Anda perlu menyiapkan file audio berkualitas tinggi, artwork, metadata lagu, dan melakukan pembayaran terlebih dahulu.",
  payment:
    "Pembayaran dilakukan melalui GoPay ke nomor 0895340205302 (Admin). Setelah pembayaran, kirimkan bukti transfer beserta detail musik Anda ke WhatsApp Admin di 085810526151.",
  platforms:
    "Kami mendistribusikan ke 150+ platform termasuk Spotify, Apple Music, YouTube Music, Deezer, Amazon Music, Tidal, dan platform streaming lainnya di seluruh dunia.",
  contact:
    "Hubungi kami melalui: WhatsApp Admin: 085810526151, Email: jesikamahjong@gmail.com, atau chat dengan saya di sini 24/7!",
  default:
    "Terima kasih atas pertanyaan Anda. Untuk informasi lebih detail atau bantuan khusus, silakan hubungi WhatsApp Admin kami di 085810526151. Saya juga bisa membantu dengan pertanyaan umum tentang harga, proses upload, platform distribusi, atau layanan kami lainnya.",
};

export default function ChatBot({ isOpen, onToggle }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: botResponses.greeting,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (
      text.includes("harga") ||
      text.includes("paket") ||
      text.includes("biaya")
    ) {
      return botResponses.pricing;
    }
    if (
      text.includes("upload") ||
      text.includes("submit") ||
      text.includes("kirim")
    ) {
      return botResponses.upload;
    }
    if (
      text.includes("bayar") ||
      text.includes("payment") ||
      text.includes("gopay")
    ) {
      return botResponses.payment;
    }
    if (
      text.includes("platform") ||
      text.includes("spotify") ||
      text.includes("streaming")
    ) {
      return botResponses.platforms;
    }
    if (
      text.includes("kontak") ||
      text.includes("hubungi") ||
      text.includes("whatsapp")
    ) {
      return botResponses.contact;
    }
    if (
      text.includes("halo") ||
      text.includes("hai") ||
      text.includes("hello")
    ) {
      return botResponses.greeting;
    }

    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-96 h-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <Bot className="text-purple-400" size={24} />
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-green-400 text-xs">Online 24/7</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:text-purple-400 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                message.isBot
                  ? "bg-white/20 text-white"
                  : "bg-purple-600 text-white"
              }`}
            >
              {message.text}
            </div>
            {!message.isBot && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan Anda..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
