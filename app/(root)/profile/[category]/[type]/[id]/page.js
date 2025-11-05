import React from "react"

export default async function Page({ params }) {
  const { id } = await params

  // Fetch professional data
  const res = await fetch(`http://127.0.0.1:8000/users/professionalprofile/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load professional data (status {res.status})
      </div>
    )
  }

  const professional = await res.json()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-5 px-4">
      {/* Profile Card */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-white p-8 text-black flex flex-col md:flex-row items-center md:items-end gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={professional.user.profile_picture}
              alt={professional.user.full_name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover "
            />
          </div>

          {/* Basic Info */}
          <div className="flex flex-col md:flex-grow text-black">
            <h1 className="text-3xl md:text-4xl font-bold text-black">{professional.user.full_name}</h1>
            <span className="w-fit inline-block bg-blue-100 text-blue-800 text-sm font-semibold mt-2 px-3 py-1 rounded-full border border-blue-200 shadow-sm">
  {professional.details.specialization}
</span>
            <p className="mt-1 text-sm text-black">
              {professional.details.experience_years} years of experience
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                ⭐ <span className="font-semibold">{professional.average_rating}</span>
                <span className="opacity-75">({professional.total_reviews} reviews)</span>
              </div>
              <div>|</div>
              <div>{professional.total_sessions} sessions</div>
            </div>
          </div>

          {/* Book Now Button */}
        </div>

        {/* Body Content */}
        <div className="p-8 space-y-8">
          {/* About */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">About</h2>
            <p className="text-gray-600 leading-relaxed">{professional.bio}</p>
          </section>

          {/* Clinic Info */}
          <section className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Work Details</h3>
            <p className="text-gray-700">
              <span className="font-medium">🏥 {professional.details.clinic.name}</span>
            </p>
            <p className="text-gray-600">{professional.details.clinic.address}</p>
            <p className="text-gray-600">
              📞 <a href={`tel:${professional.details.clinic.phone}`} className="text-blue-600 hover:underline">{professional.details.clinic.phone}</a>
            </p>
          </section>

          {/* Credentials */}
          <section className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">🎓 Degrees</h3>
              <ul className="list-disc list-inside text-gray-600">
                {professional.details.degrees.map((deg, i) => (
                  <li key={i}>{deg}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">🌐 Languages</h3>
              <div className="flex flex-wrap gap-2">
                {professional.details.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Fee and Availability */}
          <section className="flex flex-col sm:flex-row justify-between items-center bg-blue-50 border border-blue-100 rounded-lg p-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-blue-800">Consultation Fee</h3>
              <p className="text-3xl font-bold text-blue-700 mt-1">
                BDT {parseFloat(professional.consultation_fee).toFixed(2)}
              </p>
            </div>

            <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition">
              Book Appointment
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
