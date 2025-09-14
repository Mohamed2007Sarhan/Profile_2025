export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohamed Sarhan",
    "alternateName": "Mohamed Sarhan",
    "jobTitle": "Full Stack Developer & AI Engineer",
    "description": "Mohamed Sarhan is a Full Stack Developer and AI Engineer specializing in React, Next.js, TypeScript, Python, and Machine Learning. Explore my portfolio of web applications, AI projects, and technical solutions.",
    "url": "https://mohamedsarhan.dev",
    "image": "https://mohamedsarhan.dev/images/profile-mohamed.jpg",
    "sameAs": [
      "https://github.com/Mohamed2007Sarhan",
      "https://www.linkedin.com/in/mohamed-sarhan-a18530383",
      "https://x.com/MohamedSarh8"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG",
      "addressRegion": "Damietta",
      "addressLocality": "New Damietta"
    },
    "knowsAbout": [
      "Full Stack Development",
      "AI Development",
      "Machine Learning",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Mobile Development",
      "Cybersecurity"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer & AI Engineer",
      "description": "Specialized in creating modern web applications, AI solutions, and mobile apps using cutting-edge technologies",
      "skills": [
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "AI Development",
        "Machine Learning",
        "Web Development",
        "Mobile Development",
        "Cybersecurity"
      ]
    },
    "email": "prof7mohamedsarhan@gmail.com",
    "telephone": "+201040922321",
    "award": [
      "Full Stack Developer",
      "AI Engineer",
      "22+ GitHub Repositories",
      "Modern Web Technologies Expert"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
