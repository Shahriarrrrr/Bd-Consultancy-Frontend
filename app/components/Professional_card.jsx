"use client"

import { Star, MapPin, Phone, BookOpen, Globe } from "lucide-react"

export default function ProfessionalCard({ professional }) {
  const { user, details = {}, consultation_fee, average_rating, total_reviews, total_sessions, status, bio, category } = professional

  // Fallbacks
  const specialization = details.specialization || category
  const degrees = details.degrees || []
  const languages = details.languages || []
  const experience_years = details.experience_years || 0
  const clinic = details.clinic || {}

  return (
    <div className="w-full max-w-sm bg-card border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6">
        {status === "active" && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Active
          </div>
        )}

        {/* Profile */}
        <div className="text-center">
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={user.full_name}
              className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.full_name?.charAt(0) || category.charAt(0)}
            </div>
          )}

          <h2 className="text-xl font-bold text-foreground mb-1">{user?.full_name || "Unknown"}</h2>
          <p className="text-primary font-semibold text-sm">{specialization}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>

        {/* Rating & Sessions */}
        <div className="flex items-center justify-between py-3 border-y border-border">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-foreground">{average_rating}</span>
            <span className="text-xs text-muted-foreground">({total_reviews} reviews)</span>
          </div>
          <span className="text-xs text-muted-foreground">{total_sessions} sessions</span>
        </div>

        {/* Degrees & Languages */}
        {(degrees.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-4">
            {degrees.length > 0 && (
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Degrees</p>
                  <p className="text-sm font-medium text-foreground">{degrees.join(", ")}</p>
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Languages</p>
                  <p className="text-sm font-medium text-foreground">{languages.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Experience */}
        {experience_years > 0 && (
          <div className="bg-secondary rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Experience</p>
            <p className="text-lg font-bold text-foreground">{experience_years} Years</p>
          </div>
        )}

        {/* Clinic / Office Info */}
        {clinic.name && (
          <div className="space-y-2 pt-2">
            <p className="font-semibold text-sm text-foreground">{clinic.name}</p>
            {clinic.address && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{clinic.address}</span>
              </div>
            )}
            {clinic.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{clinic.phone}</span>
              </div>
            )}
          </div>
        )}

        {/* Consultation Fee */}
        {consultation_fee && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Consultation Fee</p>
              <p className="text-lg font-bold text-primary">${Number.parseFloat(consultation_fee).toFixed(2)}</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
              View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
