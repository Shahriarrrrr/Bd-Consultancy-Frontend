"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Searchbar({ placeholder = "Search...", onSearch }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const debounceRef = useRef(null);

  // Mock suggestions (replace with API calls)
  const SUGGESTIONS = [
    "Apple",
    "Amazon",
    "Adobe",
    "Android",
    "Angular",
    "Next.js",
    "NestJS",
    "Node.js",
    "Netflix",
    "Notion",
    "Nuxt",
    "Tailwind CSS",
    "TypeScript",
    "Vercel",
  ];

  useEffect(() => {
    if (!query) {
      setResults([]);
      setOpen(false);
      setActive(-1);
      return;
    }

    // simple debounce
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = SUGGESTIONS.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
      setResults(filtered);
      setOpen(true);
      setActive(-1);
    }, 180);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // keyboard nav
  function onKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0) selectItem(results[active]);
      else triggerSearch(query);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function selectItem(item) {
    setQuery(item);
    setOpen(false);
    inputRef.current?.blur();
    if (onSearch) onSearch(item);
  }

  function triggerSearch(q) {
    setOpen(false);
    inputRef.current?.blur();
    if (onSearch) onSearch(q);
  }

  // click outside closes the dropdown
  useEffect(() => {
    function onDoc(e) {
      if (
        !inputRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <label htmlFor="modern-search" className="sr-only">Search</label>
        <div className="flex items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-full shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
          <button
            type="button"
            className="px-4 py-2 flex items-center text-slate-500 hover:text-slate-700"
            onClick={() => {
              triggerSearch(query);
            }}
            aria-label="Search"
          >
            {/* search icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
            </svg>
          </button>

          <input
            id="modern-search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (results.length) setOpen(true); }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="flex-1 px-3 py-3 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
            aria-autocomplete="list"
            aria-controls="search-listbox"
            aria-expanded={open}
            role="combobox"
          />

          {query && (
            <button
              type="button"
              aria-label="Clear"
              className="px-3 py-2 text-slate-400 hover:text-slate-600"
              onClick={() => { setQuery(""); setResults([]); setOpen(false); inputRef.current?.focus(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          <div className="px-3 py-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm shadow-sm focus:outline-none"
              onClick={() => triggerSearch(query)}
            >
              Search
            </button>
          </div>
        </div>

        {/* dropdown */}
        <div ref={listRef} className={`absolute left-0 right-0 mt-2 z-30 ${open ? "block" : "hidden"}`}>
          <ul id="search-listbox" role="listbox" className="bg-white dark:bg-slate-900 rounded-xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
            {results.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-500">No suggestions</li>
            ) : (
              results.map((r, idx) => (
                <li
                  key={r}
                  role="option"
                  aria-selected={active === idx}
                  onMouseDown={() => selectItem(r)}
                  onMouseEnter={() => setActive(idx)}
                  className={`cursor-pointer px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${active === idx ? "bg-slate-50 dark:bg-slate-800" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zM19.4 19.4A8 8 0 104.6 4.6a8 8 0 0014.8 14.8z" />
                    </svg>
                    <span className="truncate max-w-xs">{r}</span>
                  </div>
                  <span className="text-xs text-slate-400">in suggestions</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
