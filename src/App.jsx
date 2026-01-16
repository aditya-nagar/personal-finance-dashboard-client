import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import API from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/check");
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md text-slate-800">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Personal Finance Dashboard
          </h1>

          <Login setUser={setUser} />
          <div className="my-4 text-center text-gray-500">OR</div>
          <Signup />
        </div>
      </div>
    );
  }

  return <Dashboard setUser={setUser} />;
}

export default App;