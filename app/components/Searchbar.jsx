"use client";

import React, { useState, useEffect } from "react";

export default function CategorySearch({ selectedCategory }) {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      let url = `http://127.0.0.1:8000/users/professionalprofile/?`;
      const params = [];
      if (selectedCategory) params.push(`category=${selectedCategory}`);
      if (query) params.push(`q=${encodeURIComponent(query)}`);
      url += params.join("&");

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProfiles(data.results || data);
    } catch (err) {
      console.error("Fetch error:", err);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever category changes
  useEffect(() => {
    if (selectedCategory) fetchProfiles();
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProfiles();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* 🔹 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <input
          type="text"
          placeholder={`Search within ${selectedCategory || "all"}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-2/3 md:w-1/2 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-900 dark:text-white dark:border-slate-700"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>

      {/* 🔹 Results */}
      {loading ? (
        <div className="text-center text-slate-500">Loading...</div>
      ) : profiles.length === 0 ? (
        <div className="text-center text-slate-500">No profiles found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {profile.category.charAt(0).toUpperCase() +
                  profile.category.slice(1)}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 mb-2">
                {profile.bio}
              </p>

              <div className="text-sm text-slate-500 mb-1">
                <strong>Specialization:</strong>{" "}
                {profile.details?.specialization || "N/A"}
              </div>

              <div className="text-sm text-slate-500 mb-1">
                <strong>Experience:</strong>{" "}
                {profile.details?.experience_years || 0} years
              </div>

              <div className="text-sm text-slate-500 mb-1">
                <strong>Fee:</strong> ${profile.consultation_fee}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
