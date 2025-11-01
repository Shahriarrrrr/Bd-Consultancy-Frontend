"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  { title: "Doctor", description: "Cold, Fever, Asma", imageSrc: "/doctor.png" },
  { title: "Lawyer", description: "Legal advice, contracts", imageSrc: "/law.png" },
  { title: "IT", description: "Frontend Backend App-Development", imageSrc: "/engineer.png" },
  { title: "Teacher", description: "Maths, English many more", imageSrc: "/teacher.svg" },
  { title: "Digital Marketer", description: "Ads solution", imageSrc: "/digitalMarketing.svg" },
];

export default function Home() {
  const router = useRouter();

  const handleCardClick = (title) => {
    // Navigate to a new page for the selected profile
    router.push(`/profile/${title.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 pb-12 text-center border-b border-gray-100">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Professional Services</h1>
        <p className="text-gray-500 text-base max-w-2xl mx-auto">Find top professionals across all categories</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(cat.title)}
              className="group cursor-pointer text-center transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-100 h-50 rounded-3xl border border-gray-300 bg-white flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-md transition-all">
                  <Image
                    src={cat.imageSrc || "/placeholder.svg"}
                    alt={cat.title}
                    width={112}
                    height={112}
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-gray-900 font-semibold text-base mb-2">{cat.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
