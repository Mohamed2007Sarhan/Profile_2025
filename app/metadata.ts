import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mohamed Sarhan - Software Engineer & Penetration Tester | Dental Student",
  description: "Professional software engineer, penetration tester, and dental student at King Salman International University. Specializing in web development, cybersecurity, AI, mobile apps, and dental technology.",
  keywords: [
    "Mohamed Sarhan",
    "Software Engineer",
    "Penetration Tester", 
    "Web Developer",
    "Cybersecurity",
    "AI Developer",
    "Mobile Developer",
    "Dental Technology",
    "King Salman International University",
    "Egypt Developer",
    "Full Stack Developer",
    "React Developer",
    "Python Developer",
    "Cybersecurity Expert",
    "Dental Software"
  ],
  authors: [{ name: "Dr. Mohamed Sarhan Hamed" }],
  creator: "Dr. Mohamed Sarhan Hamed",
  publisher: "Dr. Mohamed Sarhan Hamed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mohamedsarhan.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-EG": "/ar",
    },
  },
  openGraph: {
    title: "Mohamed Sarhan - Software Engineer & Penetration Tester",
    description: "Professional software engineer, penetration tester, and dental student. Specializing in web development, cybersecurity, AI, mobile apps, and dental technology.",
    url: "https://mohamedsarhan.dev",
    siteName: "Mohamed Sarhan Portfolio",
    images: [
      {
        url: "/images/profile-mohamed.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Sarhan - Software Engineer & Penetration Tester",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Sarhan - Software Engineer & Penetration Tester",
    description: "Professional software engineer, penetration tester, and dental student. Specializing in web development, cybersecurity, AI, mobile apps, and dental technology.",
    images: ["/images/profile-mohamed.jpg"],
    creator: "@mohamedsarhan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}
