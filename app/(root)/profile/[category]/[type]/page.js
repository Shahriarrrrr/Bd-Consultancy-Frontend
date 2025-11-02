import React from "react";

export default async function TypePage({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams?.category?.toLowerCase();
  const specialization = resolvedParams?.type?.toLowerCase();

  let data = null;
  let error = null;

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/users/professionalprofile/?specialization=${specialization}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      error = `Failed to fetch users: ${res.status}`;
    } else {
      data = await res.json();
    }
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-xl">
      <p>Page for {specialization?.replace(/-/g, " ")} ({category})</p>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {data ? (
        <pre className="text-sm mt-4 bg-gray-100 p-4 rounded max-w-xl overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        !error && <p className="text-gray-500 mt-4">Fetching...</p>
      )}
    </div>
  );
}
