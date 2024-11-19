import { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Fraction Calculators | Math Calculator Suite",
  description: "Comprehensive collection of fraction calculators for adding, subtracting, multiplying, dividing fractions, converting between different formats, and more. Learn fractions with step-by-step solutions.",
  keywords: [
    "fraction calculator",
    "add fractions",
    "subtract fractions",
    "multiply fractions",
    "divide fractions",
    "mixed numbers",
    "improper fractions",
    "fraction to decimal",
    "fraction to percent",
    "LCD calculator",
    "LCM calculator",
    "GCF calculator"
  ],
  openGraph: {
    title: "Fraction Calculators | Math Calculator Suite",
    description: "Complete suite of fraction calculators with step-by-step solutions",
    type: "website",
  }
}

const fractionCalculators = [
  {
    title: "Basic Operations",
    items: [
      { name: "Add/Subtract Fractions", href: "/fractions/adding-fractions-calculator", description: "Add or subtract up to 10 fractions at a time with step-by-step solutions", icon: "➕" },
      { name: "Multiply Fractions", href: "/fractions/multiply", description: "Multiply multiple fractions and mixed numbers", icon: "✖️" },
      { name: "Divide Fractions", href: "/fractions/divide", description: "Divide fractions with detailed steps", icon: "➗" }
    ]
  },
  {
    title: "Number Conversions",
    items: [
      { name: "Decimal to Fraction", href: "/fractions/decimal-to-fraction", description: "Convert decimals to fractions", icon: "🔄" },
      { name: "Fraction to Decimal", href: "/fractions/fraction-to-decimal", description: "Convert fractions to decimals", icon: "💯" },
      { name: "Fraction to Percent", href: "/fractions/fraction-to-percent", description: "Convert fractions to percentages", icon: "%" },
      { name: "Percent to Fraction", href: "/fractions/percent-to-fraction", description: "Convert percentages to fractions", icon: "⅓" }
    ]
  },
  {
    title: "Mixed Numbers & Complex Fractions",
    items: [
      { name: "Mixed Numbers Calculator", href: "/fractions/mixed-numbers-calculator", description: "Operations with mixed numbers and improper fractions", icon: "🔢" },
      { name: "Complex Fractions", href: "/fractions/complex", description: "Simplify and calculate with complex fractions", icon: "📊" },
      { name: "Mixed to Improper", href: "/fractions/mixed-to-improper", description: "Convert mixed numbers to improper fractions", icon: "🔄" },
      { name: "Improper to Mixed", href: "/fractions/improper-to-mixed", description: "Convert improper fractions to mixed numbers", icon: "✨" }
    ]
  },
  {
    title: "Common Factors & Multiples",
    items: [
      { name: "LCD Calculator", href: "/fractions/lcd", description: "Find Least Common Denominator", icon: "📐" },
      { name: "LCM Calculator", href: "/fractions/lcm", description: "Find Least Common Multiple", icon: "📏" },
      { name: "GCF Calculator", href: "/fractions/gcf", description: "Find Greatest Common Factor", icon: "📊" }
    ]
  },
  {
    title: "Comparison & Analysis",
    items: [
      { name: "Compare Fractions", href: "/fractions/compare", description: "Compare and order fractions", icon: "⚖️" },
      { name: "Equivalent Fractions", href: "/fractions/equivalent", description: "Generate equivalent fractions", icon: "🎯" },
      { name: "Simplify Fractions", href: "/fractions/simplify", description: "Reduce fractions to lowest terms", icon: "✨" }
    ]
  },
  {
    title: "Special Calculations",
    items: [
      { name: "Solve for X", href: "/fractions/solve-x", description: "Solve fraction equations for X", icon: "❓" },
      { name: "Average Fractions", href: "/fractions/average", description: "Calculate the average of multiple fractions", icon: "📊" },
      { name: "Ratio Calculator", href: "/fractions/ratio", description: "Work with ratios and proportions", icon: "🔢" },
      { name: "Golden Ratio", href: "/fractions/golden-ratio", description: "Calculate golden ratio relationships", icon: "🌟" }
    ]
  }
]

export default function FractionsPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Fraction Calculators
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Learn to add, subtract, multiply and divide fractions. Convert between different formats, simplify complex fractions, 
          and solve advanced fraction problems with our comprehensive calculator suite.
        </p>
      </div>

      <div className="space-y-12">
        {fractionCalculators.map((category) => (
          <div key={category.title} className="rounded-lg p-6 bg-card/50">
            <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((calc) => (
                <Link href={calc.href} key={calc.name} className="block group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glass">
                    <CardHeader>
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                        {calc.icon}
                      </div>
                      <CardTitle className="text-xl">{calc.name}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Educational Content */}
      <div className="mt-16 prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Fractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Basic Concepts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>A fraction represents a part of a whole</li>
              <li>Proper fractions have numerators less than denominators</li>
              <li>Improper fractions have numerators greater than denominators</li>
              <li>Mixed numbers combine whole numbers with proper fractions</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Common Applications</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cooking and recipes</li>
              <li>Construction and measurements</li>
              <li>Financial calculations</li>
              <li>Scientific computations</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Using Our Calculators</h3>
          <p>
            Each calculator provides step-by-step solutions to help you understand the process. 
            You can see how to find common denominators, simplify fractions, and convert between 
            different number formats. Use these tools to check your work or learn new concepts.
          </p>
        </div>
      </div>
    </div>
  )
}
