"use client";
import React from "react";

export default function CategorySelector({ selected, onSelect }) {
  const categories = ["doctor", "lawyer", "engineer", "teacher", "accountant"];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition 
            ${
              selected === c
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-indigo-50"
            }`}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </button>
      ))}
    </div>
  );
}
