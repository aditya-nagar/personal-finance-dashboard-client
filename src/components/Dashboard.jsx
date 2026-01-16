import React, { useEffect, useState } from "react";
import API from "../api";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import Charts from "./Charts";
import StatCard from "./StatCard";

const Dashboard = ({ setUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    API.get("/transactions")
      .then((res) => setTransactions(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  /* ================= CALCULATIONS ================= */
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const savings = income - expense;

  /* ================= HANDLERS ================= */
  const handleAdd = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleDelete = async (id) => {
    await API.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  const handleLogout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  if (loading) {
    return <div className="p-10 text-xl">Loading dashboard...</div>;
  }

  return (
    <div className="flex min-h-screen">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6">
        <h2 className="text-3xl font-bold mb-10">💰 Finance</h2>

        <nav className="space-y-3">
          {["dashboard", "transactions", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg transition
                ${
                  activeTab === tab
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-10 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">Personal Finance Dashboard</h1>
          <p className="text-slate-400 mt-2">
            Track, analyze and control your money
          </p>
        </div>

        {/* ================= DASHBOARD TAB ================= */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Income" value={income} icon="📈" color="border-green-500" />
              <StatCard title="Expense" value={expense} icon="📉" color="border-red-500" />
              <StatCard title="Savings" value={savings} icon="💰" color="border-blue-500" />
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Financial Overview
              </h2>
              <Charts transactions={transactions} />
            </div>
          </>
        )}

        {/* ================= TRANSACTIONS TAB ================= */}
        {activeTab === "transactions" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AddTransaction onAdd={handleAdd} />
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
            />
          </div>
        )}

        {/* ================= ANALYTICS TAB ================= */}
        {activeTab === "analytics" && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <Charts transactions={transactions} />
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;