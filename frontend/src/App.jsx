import React, { useState } from "react";
import ShortenForm from "./components/ShortenForm";
import UrlList from "./components/UrlList";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  const onShortened = () => {
    setRefresh((r) => r + 1); // trigger list refresh
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
      <ShortenForm onShortened={onShortened} />
      <UrlList refreshTrigger={refresh} />
    </div>
  );
}
