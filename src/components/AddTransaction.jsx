import React, { useState } from "react";
import API from "../api";

const AddTransaction = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Others");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !amount) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/transactions", {
        title: title.trim(),
        amount: Number(amount),
        type,
        category,
      });

      onAdd(res.data);

      setTitle("");
      setAmount("");
      setType("income");
      setCategory("Others");
    } catch (err) {
      console.error(err);
      setError("Failed to add transaction");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        ➕ Add New Transaction
      </h3>

      {error && (
        <p className="mb-3 text-sm text-red-500 bg-red-50 p-2 rounded-md">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. Salary, Rent, Grocery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* TYPE + CATEGORY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Salary">Salary</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;