import React, { useState } from "react";

export default function ShortenForm({ onShortened }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const res = await fetch(`${BASE_URL}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longurl: longUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error");
        return;
      }
      setShortUrl(data.shortURL);
      setLongUrl("");
      if(onShortened) onShortened();
    } catch {
      setError("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        className="border p-2 mr-2 w-80"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Shorten
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {shortUrl && (
        <p className="mt-2">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            {shortUrl}
          </a>
        </p>
      )}
    </form>
  );
}
