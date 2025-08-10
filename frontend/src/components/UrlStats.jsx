import React, { useState } from "react";

export default function UrlStats() {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = async (e) => {
    e.preventDefault();
    setError("");
    setStats(null);

    if (!shortcode.trim()) {
      setError("Enter shortcode");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/stats/${shortcode.trim()}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Not found");
        return;
      }
      setStats(data);
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="mt-6 border p-4 rounded max-w-md">
      <form onSubmit={fetchStats} className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Enter shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          className="border p-2 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Stats
        </button>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {stats && (
        <div>
          <p><strong>Shortcode:</strong> {stats.shortcode}</p>
          <p><strong>Long URL:</strong> <a href={stats.longurl} target="_blank" rel="noreferrer" className="text-blue-600 underline">{stats.longurl}</a></p>
          <p><strong>Visit Count:</strong> {stats.visitcount}</p>
        </div>
      )}
    </div>
  );
}
