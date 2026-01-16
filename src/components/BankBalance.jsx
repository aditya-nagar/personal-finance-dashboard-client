import React, { useEffect, useState } from "react";
import API from "../api";

const BankBalance = ({ refreshSignal }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await API.get("/balance");
      setBalance(res.data.balance || 0);
    };
    fetchBalance();
  }, [refreshSignal]);

  return (
    <div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        🏦 Bank Balance
      </h2>
      <p className="text-3xl font-bold text-green-600">
        ₹{balance.toLocaleString()}
      </p>
    </div>
  );
};

export default BankBalance;