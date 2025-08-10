import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function UrlList({ refreshTrigger }) {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);

  const fetchUrls = () => {
    fetch(`${BASE_URL}/api/all`)
      .then((res) => res.json())
      .then((data) => setUrls(data))
      .catch(() => setError("Failed to load URLs"));
  };

  useEffect(() => {
    fetchUrls();
  }, [refreshTrigger]);

  const handleDelete = async (shortcode) => {
    await fetch(`${BASE_URL}/api/delete/${shortcode}`, {
      method: "DELETE",
    });
    fetchUrls();
  };

  const handleCopy = (shortURL) => {
    navigator.clipboard.writeText(shortURL).then(() => {
      setCopied(shortURL);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (error) return <p className="text-red-600">{error}</p>;

  if (urls.length === 0) return <p>No URLs found</p>;

  return (
    <ul className="space-y-2">
      {urls.map(({ shortcode, longurl, visitcount }) => {
        const shortURL = `${BASE_URL}/${shortcode}`;
        return (
          <li key={shortcode} className="border p-2 rounded flex justify-between items-center">
            <div>
              <a
                href={shortURL}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline font-mono mr-4"
              >
                {shortcode}
              </a>
              <span>{longurl}</span>
              <span className="ml-4 text-gray-600">Visits: {visitcount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopy(shortURL)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                {copied === shortURL ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => handleDelete(shortcode)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
