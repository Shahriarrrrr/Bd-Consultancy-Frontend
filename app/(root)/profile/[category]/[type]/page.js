import ProfessionalCard from "../../../../components/Professional_card.jsx"

export default async function TypePage({ params }) {
  const resolvedParams = await params
  const category = resolvedParams?.category?.toLowerCase()
  const specialization = resolvedParams?.type?.toLowerCase()

  let data = null
  let error = null

  try {
    const res = await fetch(`http://127.0.0.1:8000/users/professionalprofile/?specialization=${specialization}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      error = `Failed to fetch users: ${res.status}`
    } else {
      data = await res.json()
    }
  } catch (err) {
    error = err.message
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2 capitalize">{specialization?.replace(/-/g, " ")}</h1>
          <p className="text-muted-foreground text-lg">
            Category: <span className="font-medium capitalize text-foreground">{category}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 p-4 rounded-lg mb-8">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {!data && !error && (
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading professionals...</p>
            </div>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((professional) => (
              <div key={professional.id} className="flex justify-center">
                <ProfessionalCard professional={professional} />
              </div>
            ))}
          </div>
        )}

        {data && data.length === 0 && (
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <p className="text-xl text-muted-foreground">
                No professionals found for {specialization?.replace(/-/g, " ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
