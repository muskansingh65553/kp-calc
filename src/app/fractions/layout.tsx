import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Fraction Calculators",
    default: "Fraction Calculators | Math Calculator Suite"
  },
  description: "Comprehensive collection of fraction calculators for mathematical operations",
  keywords: [
    "fraction calculator", 
    "math calculators", 
    "fraction operations"
  ],
  openGraph: {
    title: "Fraction Calculators | Math Calculator Suite",
    description: "Comprehensive collection of fraction calculators for all your mathematical needs.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export default function FractionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FEF9F2]">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
