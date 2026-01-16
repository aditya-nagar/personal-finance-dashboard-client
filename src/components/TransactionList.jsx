import React from "react";

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

      <ul className="space-y-3 max-h-[420px] overflow-y-auto">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition p-4 rounded-xl"
            >
              <div>
                <p className="font-medium">
                  {t.title}
                  <span
                    className={`ml-2 text-sm ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ({t.type})
                  </span>
                </p>
                <p className="text-sm text-slate-400">
                  ₹{t.amount.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => onDelete(t._id)}
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-slate-400">No transactions yet</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
