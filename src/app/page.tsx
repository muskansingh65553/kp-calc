'use client'

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

const calculatorCategories = [
  {
    title: "Mathematics",
    description: "Core mathematical calculations and operations",
    subcategories: [
      { name: "Fractions", href: "/fractions", icon: "⅓" },
      { name: "General Math", href: "/general-math", icon: "🔢" },
      { name: "Algebra", href: "/algebra", icon: "📐" }
    ]
  },
  {
    title: "Statistics & Analysis",
    description: "Statistical calculations and data analysis",
    subcategories: [
      { name: "Statistics", href: "/statistics", icon: "📊" },
      { name: "Discrete Math", href: "/discrete-math", icon: "🎲" }
    ]
  },
  {
    title: "Geometry",
    description: "Geometric calculations and measurements",
    subcategories: [
      { name: "Plane Geometry", href: "/plane-geometry", icon: "📏" },
      { name: "Solid Geometry", href: "/solid-geometry", icon: "🎲" },
      { name: "Trigonometry", href: "/trigonometry", icon: "📐" }
    ]
  },
  {
    title: "Finance",
    description: "Financial calculations and analysis",
    subcategories: [
      { name: "Loans", href: "/loans", icon: "💰" },
      { name: "Interest and APR", href: "/interest", icon: "💹" },
      { name: "Time Value of Money", href: "/time-value", icon: "⏰" },
      { name: "Financial Ratios", href: "/financial-ratios", icon: "📈" },
      { name: "Sales and Retail", href: "/sales", icon: "🏪" },
      { name: "Personal Finance", href: "/personal-finance", icon: "💵" },
      { name: "Depreciation", href: "/depreciation", icon: "📉" },
      { name: "Saving and Investing", href: "/investing", icon: "🏦" },
      { name: "Money, Pay, Taxes", href: "/money", icon: "💸" }
    ]
  },
  {
    title: "Time & Construction",
    description: "Time, date, and construction calculations",
    subcategories: [
      { name: "Time and Date", href: "/time-date", icon: "📅" },
      { name: "Construction", href: "/construction", icon: "🏗️" }
    ]
  },
  {
    title: "Science & Technology",
    description: "Scientific and technical calculations",
    subcategories: [
      { name: "Conversions", href: "/conversions", icon: "🔄" },
      { name: "Technology", href: "/technology", icon: "💻" },
      { name: "Physics", href: "/physics", icon: "⚡" },
      { name: "Chemistry", href: "/chemistry", icon: "🧪" }
    ]
  },
  {
    title: "Lifestyle & Misc",
    description: "Various lifestyle and miscellaneous calculations",
    subcategories: [
      { name: "Games/Sports", href: "/games-sports", icon: "🎮" },
      { name: "Health", href: "/health", icon: "❤️" },
      { name: "Miscellaneous", href: "/misc", icon: "🔧" }
    ]
  }
]

export default function Home() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Math Calculators
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          A collection of helpful calculators for various mathematical operations
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {calculatorCategories.map((category) => (
          <div key={category.title}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 glass">
              <CardHeader>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.subcategories.map((sub) => (
                    <Link 
                      href={sub.href} 
                      key={sub.name}
                      className="p-3 rounded-lg hover:bg-[#FFE3E3] transition-colors group flex items-center space-x-2"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {sub.icon}
                      </span>
                      <span className="text-sm transition-colors">
                        {sub.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
