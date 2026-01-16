import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-xl p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">
            ₹{value.toLocaleString()}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
