import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import { StructuredData } from "./structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://mohamedsarhan.dev'),
  title: "Mohamed Sarhan - Software Engineer & Full Stack Developer & AI Engineer | Portfolio",
  description:
    "Mohamed Sarhan is a Software Engineer and Full Stack Developer and AI Engineer specializing in React, Next.js, TypeScript, Python, and Machine Learning. Explore my portfolio of web applications, AI projects, and technical solutions.",
  generator: "Next.js",
  keywords: [
    "Mohamed Sarhan", 
    "Full Stack Developer", 
    "AI Engineer", 
    "React Developer", 
    "Next.js Developer", 
    "TypeScript", 
    "Python Developer", 
    "Machine Learning", 
    "Web Development", 
    "Frontend Developer", 
    "Backend Developer", 
    "JavaScript", 
    "Node.js", 
    "Artificial Intelligence",
    "Software Engineer",
    "Egyptian Developer",
    "Portfolio",
    "Web Applications",
    "Mobile Development",
    "Cybersecurity"
  ],
  authors: [{ name: "Mohamed Sarhan" }],
  creator: "Mohamed Sarhan",
  publisher: "Mohamed Sarhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    title: "Mohamed Sarhan - Full Stack Developer & AI Engineer | Portfolio",
    description: "Mohamed Sarhan is a Full Stack Developer and AI Engineer specializing in React, Next.js, TypeScript, Python, and Machine Learning. Explore my portfolio of web applications and AI projects.",
    siteName: "Mohamed Sarhan Portfolio",
    url: "https://mohamedsarhan.dev",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Sarhan - Full Stack Developer & AI Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Sarhan - Full Stack Developer & AI Engineer | Portfolio",
    description: "Mohamed Sarhan is a Full Stack Developer and AI Engineer specializing in React, Next.js, TypeScript, Python, and Machine Learning. Explore my portfolio of web applications and AI projects.",
    images: ["/images/twitter-image.jpg"],
    creator: "@MohamedSarh8"
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
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://mohamedsarhan.dev",
    languages: {
      "en-US": "https://mohamedsarhan.dev",
      "ar-SA": "https://mohamedsarhan.dev/ar",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
