import React from "react";

export default function FindConnectionSearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search by skills (e.g. React, UI/UX, Python)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#457B9D] outline-none transition"
      />
    </div>
  );
}
