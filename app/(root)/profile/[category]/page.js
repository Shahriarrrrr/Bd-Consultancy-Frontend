import Image from "next/image";
import Link from "next/link";

export const subcategories = {
  doctor: [
    { title: "General Physician", description: "Cold, flu, infections, fever", imageSrc: "/doctor-icon.png" },
    { title: "Cardiologist", description: "Heart specialist, cardiac care", imageSrc: "/cardiologist.png" },
    { title: "Pediatrician", description: "Child healthcare", imageSrc: "/pediatrician.png" },
    { title: "Dermatologist", description: "Skin, hair and nail problems", imageSrc: "/dermatologist.png" },
    { title: "Psychiatrist", description: "Mental health, counseling", imageSrc: "/psychiatrist.png" },
  ],
  lawyer: [
    { title: "Corporate Lawyer", description: "Business contracts, company law", imageSrc: "/lawyer-icon.png" },
    { title: "Criminal Lawyer", description: "Criminal defense cases", imageSrc: "/lawyer-icon2.png" },
    { title: "Family Lawyer", description: "Divorce, child custody, family disputes", imageSrc: "/family-lawyer.png" },
    { title: "Property Lawyer", description: "Real estate, property disputes", imageSrc: "/property-lawyer.png" },
  ],
  it: [
    { title: "Frontend Developer", description: "React, Next.js, Vue", imageSrc: "/frontend.png" },
    { title: "Backend Developer", description: "Node.js, Python, Java", imageSrc: "/backend.png" },
    { title: "Full Stack Developer", description: "Frontend + Backend", imageSrc: "/fullstack.png" },
    { title: "DevOps Engineer", description: "CI/CD, cloud infrastructure", imageSrc: "/devops.png" },
  ],
  teacher: [
    { title: "Math Teacher", description: "Algebra, Calculus, Geometry", imageSrc: "/math-teacher.png" },
    { title: "English Teacher", description: "Grammar, Literature, Writing", imageSrc: "/english-teacher.png" },
    { title: "Science Teacher", description: "Physics, Chemistry, Biology", imageSrc: "/science-teacher.png" },
    { title: "Language Tutor", description: "French, Spanish, German, etc.", imageSrc: "/language-teacher.png" },
  ],
  "digital marketer": [
    { title: "SEO Specialist", description: "Search engine optimization", imageSrc: "/seo.png" },
    { title: "Social Media Manager", description: "Instagram, Facebook, LinkedIn", imageSrc: "/socialmedia.png" },
    { title: "Content Marketer", description: "Blog posts, copywriting, campaigns", imageSrc: "/content.png" },
    { title: "PPC Specialist", description: "Paid ads on Google & social media", imageSrc: "/ppc.png" },
  ],
};


// Make the page async
export default async function CategoryPage({ params }) {
  // Await the params to get the actual object
  const resolvedParams = await params;
  const category = resolvedParams?.category?.toLowerCase();

  const items = subcategories[category] || [];

  if (!category || !items.length) {
    return <p className="text-center mt-20 text-xl">Category not found</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 pb-12 text-center border-b border-gray-100">
        <h1 className="text-5xl font-bold mb-4">
          {category.charAt(0).toUpperCase() + category.slice(1)} Types
        </h1>
        <p className="text-gray-500 text-base max-w-2xl mx-auto">
          Choose the type of {category} you are looking for
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <Link
              key={item.title}
              href={`/profile/${category}/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="group cursor-pointer text-center transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-6 ">
                <div className="w-100 h-50 rounded-3xl border border-gray-300 bg-white flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-md transition-all">
                  <Image
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.title}
                    width={112}
                    height={112}
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-gray-900 font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
