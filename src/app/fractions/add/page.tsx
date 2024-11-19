'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export const metadata = {
  title: "Add Fractions Calculator",
  description: "Easily add fractions with our step-by-step fraction addition calculator",
  keywords: "add fractions, fraction addition, math calculator"
}

interface Fraction {
  numerator: string
  denominator: string
}

export default function AddFractionsPage() {
  const [fractions, setFractions] = useState<Fraction[]>([
    { numerator: "", denominator: "" },
    { numerator: "", denominator: "" }
  ])
  const [result, setResult] = useState<string>("")
  const [steps, setSteps] = useState<string[]>([])

  const addFraction = () => {
    setFractions([...fractions, { numerator: "", denominator: "" }])
  }

  const updateFraction = (index: number, field: keyof Fraction, value: string) => {
    const newFractions = [...fractions]
    newFractions[index][field] = value
    setFractions(newFractions)
  }

  const calculateSum = () => {
    // Simplified calculation logic
    const validFractions = fractions.filter(f => f.numerator && f.denominator)
    
    if (validFractions.length < 2) {
      setSteps(["Please enter at least two fractions"])
      setResult("")
      return
    }

    const calculationSteps: string[] = []
    
    // Find the least common multiple (LCM) of denominators
    const denominators = validFractions.map(f => parseInt(f.denominator))
    const lcm = denominators.reduce((a, b) => {
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y)
      return Math.abs(a * b) / gcd(a, b)
    })

    calculationSteps.push(`Finding common denominator: ${lcm}`)

    // Convert fractions to equivalent fractions with LCM
    const convertedFractions = validFractions.map(f => {
      const factor = lcm / parseInt(f.denominator)
      return {
        numerator: (parseInt(f.numerator) * factor).toString(),
        denominator: lcm.toString()
      }
    })

    calculationSteps.push(`Converting fractions: ${convertedFractions.map(f => `${f.numerator}/${f.denominator}`).join(', ')}`)

    // Sum numerators
    const sumNumerator = convertedFractions.reduce((sum, f) => sum + parseInt(f.numerator), 0)
    
    calculationSteps.push(`Adding numerators: ${sumNumerator}/${lcm}`)

    // Simplify result
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
    const divisor = gcd(sumNumerator, lcm)
    const simplifiedNumerator = sumNumerator / divisor
    const simplifiedDenominator = lcm / divisor

    calculationSteps.push(`Simplifying: ${simplifiedNumerator}/${simplifiedDenominator}`)

    setSteps(calculationSteps)
    setResult(`${simplifiedNumerator}/${simplifiedDenominator}`)
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Add Fractions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Add two or more fractions together with step-by-step solutions
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Enter Your Fractions</CardTitle>
            <CardDescription>Enter the numerator and denominator for each fraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fractions.map((fraction, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Label htmlFor={`numerator-${index}`}>Numerator</Label>
                    <Input
                      id={`numerator-${index}`}
                      type="number"
                      value={fraction.numerator}
                      onChange={(e) => updateFraction(index, "numerator", e.target.value)}
                      className="w-24"
                    />
                  </div>
                  <div className="text-2xl">⁄</div>
                  <div className="flex flex-col items-center">
                    <Label htmlFor={`denominator-${index}`}>Denominator</Label>
                    <Input
                      id={`denominator-${index}`}
                      type="number"
                      value={fraction.denominator}
                      onChange={(e) => updateFraction(index, "denominator", e.target.value)}
                      className="w-24"
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex gap-4">
                <Button onClick={addFraction} variant="outline">
                  Add Another Fraction
                </Button>
                <Button onClick={calculateSum} className="bg-purple-600 hover:bg-purple-700">
                  Calculate Sum
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {steps.length > 0 && (
          <div className="mt-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Step-by-Step Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-6 space-y-4">
                  {steps.map((step, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="mt-6 p-4 border rounded-lg bg-purple-500/10">
                  <h3 className="font-bold mb-2">Result:</h3>
                  <p className="text-2xl text-purple-400">{result}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* SEO-friendly educational content */}
      <div className="mt-16 prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-4">How to Add Fractions</h2>
        <p className="text-muted-foreground">
          Adding fractions requires finding a common denominator. Here's a step-by-step guide:
        </p>
        <ol className="list-decimal pl-6 text-muted-foreground">
          <li>Find the least common multiple (LCM) of the denominators</li>
          <li>Convert each fraction to an equivalent fraction with the LCM as the denominator</li>
          <li>Add the numerators while keeping the denominator the same</li>
          <li>Simplify the resulting fraction if possible</li>
        </ol>

        <h3 className="text-2xl font-bold mt-8 mb-4">Example</h3>
        <p className="text-muted-foreground">
          Adding 1/2 and 1/3:
          1. LCM of 2 and 3 is 6
          2. 1/2 = 3/6, 1/3 = 2/6
          3. 3/6 + 2/6 = 5/6
        </p>
      </div>
    </div>
  )
}
