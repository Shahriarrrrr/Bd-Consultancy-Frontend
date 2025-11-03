import React from "react"

// ✅ Server component (async works fine in app router)
export default async function Page({ params }) {
  // Unwrap params (Next.js 15+/16+)
  const { category, type, id } = await params

  // 🔗 Fetch your real Django API
  const res = await fetch(`http://127.0.0.1:8000/users/professionalprofile/${id}`, {
    cache: "no-store", // always fetch latest data
  })

  if (!res.ok) {
    // If something goes wrong, show a readable error
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load professional data (status {res.status})
      </div>
    )
  }

  const professional = await res.json()

  return (
    <div className="p-8 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        {professional.user.profile_picture ? (
          <img
            src={professional.user.profile_picture}
            alt={professional.user.full_name}
            className="w-20 h-20 rounded-full border object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            👩‍⚕️
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{professional.user.full_name}</h1>
          <p className="text-muted-foreground">{professional.details.specialization}</p>
          <p className="text-sm text-gray-500">
            Experience: {professional.details.experience_years} years
          </p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h2 className="text-lg font-semibold">About</h2>
        <p className="text-gray-700">{professional.bio}</p>
      </div>

      {/* Clinic Details */}
      <div className="border rounded-lg p-4 bg-card space-y-2">
        <h2 className="font-semibold">Clinic Details</h2>
        <p><strong>Name:</strong> {professional.details.clinic.name}</p>
        <p><strong>Address:</strong> {professional.details.clinic.address}</p>
        <p><strong>Phone:</strong> {professional.details.clinic.phone}</p>
      </div>

      {/* Extra Info */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-700">
        <p><strong>Consultation Fee:</strong> ${professional.consultation_fee}</p>
        <p><strong>Languages:</strong> {professional.details.languages.join(", ")}</p>
        <p><strong>Degrees:</strong> {professional.details.degrees.join(", ")}</p>
      </div>

      {/* Rating */}
      <div className="text-sm text-gray-500">
        ⭐ <strong>{professional.average_rating}</strong> ({professional.total_reviews} reviews)
      </div>
    </div>
  )
}
