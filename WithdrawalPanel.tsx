"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  ArrowDownToLine,
  Banknote,
} from "lucide-react";
import { Artist, WithdrawalRequest, supabase } from "@/lib/supabase/client";

interface WithdrawalPanelProps {
  artist: Artist | null;
}

export default function WithdrawalPanel({ artist }: WithdrawalPanelProps) {
  const [withdrawalRequests, setWithdrawalRequests] = useState<
    WithdrawalRequest[]
  >([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    bank_name: "",
    account_number: "",
    account_name: "",
    notes: "",
  });

  const availableBalance = artist?.total_revenue
    ? artist.total_revenue * 0.9
    : 0; // 90% of total revenue
  const minimumWithdrawal = 100000; // 100k IDR

  useEffect(() => {
    loadWithdrawalHistory();
  }, []);

  const loadWithdrawalHistory = async () => {
    // Demo data for now
    const demoRequests: WithdrawalRequest[] = [
      {
        id: "1",
        artist_id: artist?.id || "demo",
        amount: 5000000,
        status: "completed",
        bank_name: "BCA",
        account_number: "1234567890",
        account_name: "Demo Artist",
        created_at: "2024-01-01",
        processed_at: "2024-01-02",
      },
      {
        id: "2",
        artist_id: artist?.id || "demo",
        amount: 3500000,
        status: "processing",
        bank_name: "Mandiri",
        account_number: "0987654321",
        account_name: "Demo Artist",
        created_at: "2024-01-10",
      },
      {
        id: "3",
        artist_id: artist?.id || "demo",
        amount: 2000000,
        status: "pending",
        bank_name: "BNI",
        account_number: "1122334455",
        account_name: "Demo Artist",
        created_at: "2024-01-15",
      },
    ];
    setWithdrawalRequests(demoRequests);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseInt(formData.amount);

    if (amount < minimumWithdrawal) {
      alert(
        `Minimum withdrawal amount is ${formatCurrency(minimumWithdrawal)}`,
      );
      return;
    }

    if (amount > availableBalance) {
      alert(
        `Insufficient balance. Available: ${formatCurrency(availableBalance)}`,
      );
      return;
    }

    // Create withdrawal request
    const newRequest: WithdrawalRequest = {
      id: Date.now().toString(),
      artist_id: artist?.id || "demo",
      amount,
      status: "pending",
      bank_name: formData.bank_name,
      account_number: formData.account_number,
      account_name: formData.account_name,
      notes: formData.notes,
      created_at: new Date().toISOString(),
    };

    setWithdrawalRequests([newRequest, ...withdrawalRequests]);
    setShowForm(false);
    setFormData({
      amount: "",
      bank_name: "",
      account_number: "",
      account_name: "",
      notes: "",
    });

    // Send WhatsApp notification to admin
    const message = `*WITHDRAWAL REQUEST*
*Nabila Ahmad Studio*

*Artist:* ${artist?.name}
*Amount:* ${formatCurrency(amount)}
*Bank:* ${formData.bank_name}
*Account:* ${formData.account_number}
*Name:* ${formData.account_name}
*Notes:* ${formData.notes || "None"}

Please process this withdrawal request.`;

    const whatsappUrl = `https://wa.me/6285810526151?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-400" size={20} />;
      case "processing":
        return <Clock className="text-yellow-400" size={20} />;
      case "pending":
        return <Clock className="text-orange-400" size={20} />;
      case "rejected":
        return <XCircle className="text-red-400" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "processing":
        return "bg-yellow-600";
      case "pending":
        return "bg-orange-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* Balance Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-green-600 rounded-xl">
              <Wallet className="text-white" size={28} />
            </div>
            <span className="text-green-300 font-medium">
              Available Balance
            </span>
          </div>
          <p className="text-4xl font-bold text-white mb-2">
            {formatCurrency(availableBalance)}
          </p>
          <p className="text-green-400 text-sm">Ready for withdrawal</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-blue-600 rounded-xl">
              <ArrowDownToLine className="text-white" size={28} />
            </div>
            <span className="text-blue-300 font-medium">
              Pending Withdrawals
            </span>
          </div>
          <p className="text-4xl font-bold text-white mb-2">
            {
              withdrawalRequests.filter(
                (r) => r.status === "pending" || r.status === "processing",
              ).length
            }
          </p>
          <p className="text-blue-400 text-sm">In process</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-purple-600 rounded-xl">
              <Banknote className="text-white" size={28} />
            </div>
            <span className="text-purple-300 font-medium">Total Withdrawn</span>
          </div>
          <p className="text-4xl font-bold text-white mb-2">
            {formatCurrency(
              withdrawalRequests
                .filter((r) => r.status === "completed")
                .reduce((sum, r) => sum + r.amount, 0),
            )}
          </p>
          <p className="text-purple-400 text-sm">Lifetime</p>
        </div>
      </div>

      {/* Quick Withdraw */}
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <CreditCard className="text-purple-400" size={28} />
            Request Withdrawal
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            {showForm ? "Cancel" : "New Withdrawal"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mb-8 p-6 bg-white/5 rounded-xl border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Withdrawal Amount *
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  min={minimumWithdrawal}
                  max={availableBalance}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder={`Min. ${formatCurrency(minimumWithdrawal)}`}
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  Available: {formatCurrency(availableBalance)}
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Bank Name *
                </label>
                <select
                  value={formData.bank_name}
                  onChange={(e) =>
                    setFormData({ ...formData, bank_name: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="BCA" className="bg-gray-800">
                    BCA
                  </option>
                  <option value="Mandiri" className="bg-gray-800">
                    Mandiri
                  </option>
                  <option value="BNI" className="bg-gray-800">
                    BNI
                  </option>
                  <option value="BRI" className="bg-gray-800">
                    BRI
                  </option>
                  <option value="CIMB Niaga" className="bg-gray-800">
                    CIMB Niaga
                  </option>
                  <option value="Danamon" className="bg-gray-800">
                    Danamon
                  </option>
                  <option value="Permata" className="bg-gray-800">
                    Permata
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.account_number}
                  onChange={(e) =>
                    setFormData({ ...formData, account_number: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="1234567890"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={formData.account_name}
                  onChange={(e) =>
                    setFormData({ ...formData, account_name: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                placeholder="Additional notes for this withdrawal..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Submit Withdrawal Request
            </button>
          </form>
        )}

        <div className="bg-blue-600/10 border border-blue-400/30 rounded-xl p-4">
          <h4 className="text-blue-300 font-semibold mb-2">
            Withdrawal Information:
          </h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Minimum withdrawal: {formatCurrency(minimumWithdrawal)}</li>
            <li>• Processing time: 1-3 business days</li>
            <li>• No withdrawal fees</li>
            <li>• Withdrawals are processed Monday to Friday</li>
          </ul>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Clock className="text-purple-400" size={28} />
          Withdrawal History
        </h3>

        <div className="space-y-4">
          {withdrawalRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(request.status)}
                <div>
                  <h4 className="text-white font-semibold">
                    {formatCurrency(request.amount)}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {request.bank_name} • {request.account_number}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(request.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(request.status)}`}
                >
                  {request.status.toUpperCase()}
                </span>
                {request.processed_at && (
                  <p className="text-gray-400 text-xs mt-1">
                    Processed:{" "}
                    {new Date(request.processed_at).toLocaleDateString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
