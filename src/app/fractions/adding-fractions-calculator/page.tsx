'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader } from "@/components/ui/loader"

interface Fraction {
  numerator: string
  denominator: string
  operation: '+' | '-'
}

export default function AddingFractionsCalculator() {
  const [fractions, setFractions] = useState<Fraction[]>([
    { numerator: "", denominator: "", operation: '+' },
    { numerator: "", denominator: "", operation: '+' }
  ])
  const [numFractions, setNumFractions] = useState("2")
  const [result, setResult] = useState<string>("")
  const [steps, setSteps] = useState<any[]>([])
  const [error, setError] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState(false)

  const updateNumFractions = (value: string) => {
    const num = parseInt(value)
    setNumFractions(value)
    if (num > fractions.length) {
      setFractions([...fractions, ...Array(num - fractions.length).fill({ numerator: "", denominator: "", operation: '+' })])
    } else {
      setFractions(fractions.slice(0, num))
    }
  }

  const updateFraction = (index: number, field: keyof Fraction, value: string) => {
    const newFractions = [...fractions]
    if (field === 'operation') {
      newFractions[index] = { ...newFractions[index], operation: value as '+' | '-' }
    } else {
      newFractions[index] = { ...newFractions[index], [field]: value }
    }
    setFractions(newFractions)
  }

  const clearCalculator = () => {
    setFractions(fractions.map(() => ({ numerator: "", denominator: "", operation: '+' })))
    setResult("")
    setSteps([])
    setError("")
  }

  const calculateResult = async () => {
    // Start loading
    setIsCalculating(true)
    setSteps([])
    setResult("")
    setError("")

    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Validate inputs
    const validFractions = fractions.filter(f => f.numerator && f.denominator)
    if (validFractions.length < 2) {
      setError("Please enter at least two fractions")
      setIsCalculating(false)
      return
    }

    // Validate denominators are not zero
    if (validFractions.some(f => parseInt(f.denominator) === 0)) {
      setError("Denominators cannot be zero")
      setIsCalculating(false)
      return
    }

    setError("")
    const steps: any[] = []
    
    // Initial equation
    steps.push({
      type: "equation",
      content: validFractions.map((f, i) => 
        `${i > 0 ? ` ${f.operation} ` : ""}${f.numerator}/${f.denominator}`
      ).join("")
    })

    // Find LCD of denominators
    const denominators = validFractions.map(f => Math.abs(parseInt(f.denominator)))
    const lcd = denominators.reduce((a, b) => {
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y)
      return Math.abs(a * b) / gcd(a, b)
    })

    steps.push({
      type: "explanation",
      content: "Step 1: Find the Least Common Denominator (LCD)",
      details: [
        `Denominators: ${denominators.join(", ")}`,
        `LCD = ${lcd}`
      ]
    })

    // Convert fractions to equivalent fractions with LCD
    const convertedFractions = validFractions.map((f, i) => {
      const factor = lcd / Math.abs(parseInt(f.denominator))
      const newNumerator = parseInt(f.numerator) * factor
      
      steps.push({
        type: "explanation",
        content: `Step 2${String.fromCharCode(97 + i)}: Convert fraction ${i + 1} to an equivalent fraction with LCD`,
        details: [
          `${f.numerator}/${f.denominator} = (${f.numerator} × ${factor})/(${f.denominator} × ${factor})`,
          `= ${newNumerator}/${lcd}`
        ]
      })

      return {
        numerator: newNumerator,
        denominator: lcd,
        operation: f.operation
      }
    })

    steps.push({
      type: "equation",
      content: convertedFractions.map((f, i) => 
        `${i > 0 ? ` ${f.operation} ` : ""}${f.numerator}/${f.denominator}`
      ).join("")
    })

    // Add/subtract numerators
    let finalNumerator = convertedFractions[0].numerator
    let calculationSteps = [`${finalNumerator}`]
    
    for (let i = 1; i < convertedFractions.length; i++) {
      const f = convertedFractions[i]
      if (f.operation === '+') {
        finalNumerator += f.numerator
        calculationSteps.push(`+ ${f.numerator}`)
      } else {
        finalNumerator -= f.numerator
        calculationSteps.push(`- ${f.numerator}`)
      }
    }

    steps.push({
      type: "explanation",
      content: "Step 3: Add/Subtract the numerators",
      details: [
        `${calculationSteps.join(" ")} = ${finalNumerator}`,
        `Result: ${finalNumerator}/${lcd}`
      ]
    })

    // Simplify result
    const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b)
    const divisor = gcd(finalNumerator, lcd)
    const simplifiedNumerator = finalNumerator / divisor
    const simplifiedDenominator = lcd / divisor

    if (divisor !== 1) {
      steps.push({
        type: "explanation",
        content: "Step 4: Simplify the fraction",
        details: [
          `Find the Greatest Common Divisor (GCD) of ${finalNumerator} and ${lcd}`,
          `GCD = ${divisor}`,
          `Divide both numbers by ${divisor}:`,
          `${finalNumerator}/${lcd} = (${finalNumerator} ÷ ${divisor})/(${lcd} ÷ ${divisor})`,
          `= ${simplifiedNumerator}/${simplifiedDenominator}`
        ]
      })
    }

    // Convert to mixed number if applicable
    if (Math.abs(simplifiedNumerator) > simplifiedDenominator) {
      const wholePart = Math.floor(Math.abs(simplifiedNumerator) / simplifiedDenominator)
      const remainder = Math.abs(simplifiedNumerator) % simplifiedDenominator
      const sign = simplifiedNumerator < 0 ? '-' : ''

      steps.push({
        type: "explanation",
        content: "Step 5: Convert to mixed number",
        details: [
          `Divide ${Math.abs(simplifiedNumerator)} by ${simplifiedDenominator}:`,
          `${Math.abs(simplifiedNumerator)} ÷ ${simplifiedDenominator} = ${wholePart} remainder ${remainder}`,
          remainder === 0 
            ? `Final answer: ${sign}${wholePart}`
            : `Final answer: ${sign}${wholePart} ${remainder}/${simplifiedDenominator}`
        ]
      })

      if (remainder === 0) {
        setResult(`${sign}${wholePart}`)
      } else {
        setResult(`${sign}${wholePart} ${remainder}/${simplifiedDenominator}`)
      }
    } else {
      setResult(`${simplifiedNumerator}/${simplifiedDenominator}`)
      steps.push({
        type: "explanation",
        content: "Final Answer",
        details: [`${simplifiedNumerator}/${simplifiedDenominator}`]
      })
    }

    setSteps(steps)
    setIsCalculating(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-[#3B1E54]">
          Add and Subtract Fractions
        </h1>
        <p className="text-lg md:text-xl text-[#021526] max-w-2xl mx-auto px-4">
          Enter your fractions below and see the step-by-step solution
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Number of Fractions Selector */}
        <Card className="glass">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl text-[#3B1E54]">How many fractions?</CardTitle>
            <CardDescription className="text-[#021526]">
              Select the number of fractions you want to work with (2-10)
            </CardDescription>
          </CardHeader>
          <CardContent>
<Select value={numFractions} onValueChange={updateNumFractions}>
  <SelectTrigger className="w-full text-[#3B1E54] bg-white">
    <SelectValue placeholder="Select number of fractions" />
  </SelectTrigger>
  <SelectContent className="bg-white">
    {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
      <SelectItem 
        key={num} 
        value={num.toString()} 
        className="text-[#3B1E54] bg-white hover:bg-[#FFE3E3]"
      >
        {num} Fractions
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          </CardContent>
        </Card>

        {/* Fraction Input Section */}
        <Card className="glass">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl text-[#3B1E54]">Enter Your Fractions</CardTitle>
            <CardDescription className="text-[#021526]">
              Fill in the numerator and denominator for each fraction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fractions.map((fraction, index) => (
                <div key={index} 
                  className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-card/50 hover:bg-card/70 transition-colors">
                  {/* Operation Selector (except for first fraction) */}
                  {index > 0 && (
                    <div className="w-full md:w-auto mb-4 md:mb-0">
                      <Select 
                        value={fraction.operation} 
                        onValueChange={(value) => updateFraction(index, 'operation', value)}
                      >
                        <SelectTrigger className="w-full md:w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+">+</SelectItem>
                          <SelectItem value="-">−</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* Fraction Input Fields */}
                  <div className="flex flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
                    <div className="flex flex-col items-center flex-1 md:flex-none">
                      <Label htmlFor={`numerator-${index}`} className="mb-1 text-sm md:text-base">
                        Numerator
                      </Label>
                      <Input
                        id={`numerator-${index}`}
                        type="number"
                        value={fraction.numerator}
                        onChange={(e) => updateFraction(index, "numerator", e.target.value)}
                        className="w-full md:w-24 text-center"
                        placeholder="0"
                      />
                    </div>
                    <div className="text-2xl font-bold self-end mb-2">⁄</div>
                    <div className="flex flex-col items-center flex-1 md:flex-none">
                      <Label htmlFor={`denominator-${index}`} className="mb-1 text-sm md:text-base">
                        Denominator
                      </Label>
                      <Input
                        id={`denominator-${index}`}
                        type="number"
                        value={fraction.denominator}
                        onChange={(e) => updateFraction(index, "denominator", e.target.value)}
                        className="w-full md:w-24 text-center"
                        placeholder="1"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-8">
  <Button 
    onClick={clearCalculator} 
    variant="outline"
    className="w-1/2 border-[#0B2447] text-[#0B2447] hover:bg-[#0B2447]/10"
    disabled={isCalculating}
  >
    Clear All
  </Button>
  <Button 
    onClick={calculateResult} 
    className="w-1/2 btn-primary"
    disabled={isCalculating}
  >
    {isCalculating ? (
      <div className="flex items-center justify-center gap-2">
        <div className="h-4 w-4 border-2 border-[#C9E9D2] border-t-transparent rounded-full animate-spin" />
        <span>Calculating...</span>
      </div>
    ) : (
      "Calculate"
    )}
  </Button>
</div>

              {/* Error Message */}
              {error && (
                <p className="text-[#FFE3E3] mt-4 text-center">{error}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isCalculating && (
          <Card className="glass">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl text-[#3B1E54]">Calculating Result</CardTitle>
              <CardDescription className="text-[#021526]">
                Please wait while we process your calculation...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <Loader className="mb-4" />
                <div className="flex justify-center items-center gap-2 text-sm md:text-base text-[#021526]">
                  <div className="h-3 w-3 border-2 border-[#C9E9D2] border-t-transparent rounded-full animate-spin" />
                  <span>Processing calculations...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {!isCalculating && steps.length > 0 && (
          <Card className="glass">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl text-[#3B1E54]">Detailed Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[#789DBC]/5 border border-[#789DBC]/10">
                    {step.type === "equation" ? (
                      <div className="text-base md:text-xl font-mono text-center py-2 break-words text-[#021526]">
                        {step.content}
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-base md:text-lg text-[#3B1E54] mb-2">
                          {step.content}
                        </h4>
                        <ul className="space-y-2 pl-4">
                          {step.details.map((detail, i) => (
                            <li key={i} className="text-sm md:text-base text-[#021526] font-mono break-words">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
                
                <div className="mt-8 p-4 md:p-6 rounded-lg bg-[#C9E9D2]/10 border border-[#789DBC]/20">
                  <h3 className="font-bold text-lg md:text-xl mb-2 text-[#3B1E54]">Final Result:</h3>
                  <p className="text-2xl md:text-4xl font-bold text-center py-4 break-words text-[#021526]">{result}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Educational Content Section */}
      <section className="mt-16 md:mt-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#3B1E54]">
              Understanding Fraction Addition & Subtraction
            </h2>
            <p className="text-lg text-[#021526] max-w-3xl mx-auto">
              Learn how to add and subtract fractions with our comprehensive guide. Master the concepts of finding common denominators, simplifying fractions, and working with mixed numbers.
            </p>
          </div>

          {/* Key Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Rules */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl text-[#3B1E54]">Basic Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#3B1E54]">Like Denominators:</h4>
                  <p className="text-[#021526]">
                    When fractions have the same denominator:
                  </p>
                  <ul className="list-disc pl-6 text-[#021526]">
                    <li>Add/subtract only the numerators</li>
                    <li>Keep the denominator the same</li>
                    <li>Simplify if possible</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#3B1E54]">Unlike Denominators:</h4>
                  <p className="text-[#021526]">
                    When denominators are different:
                  </p>
                  <ul className="list-disc pl-6 text-[#021526]">
                    <li>Find the LCD (Least Common Denominator)</li>
                    <li>Convert each fraction to equivalent fraction with LCD</li>
                    <li>Add/subtract numerators</li>
                    <li>Simplify the result</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl text-[#3B1E54]">Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-[#021526]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    Adding denominators: 1/4 + 1/4 ≠ 2/8
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    Using different denominators without finding LCD
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    Forgetting to simplify the final answer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    Not converting mixed numbers to improper fractions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Examples Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-[#3B1E54]">Step-by-Step Examples</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Example 1 */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3B1E54]">Like Denominators Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#021526]">2/5 + 1/5</p>
                    <ol className="list-decimal pl-6 text-[#021526] space-y-2">
                      <li>Denominators are same (5)</li>
                      <li>Add numerators: 2 + 1 = 3</li>
                      <li>Keep denominator: 3/5</li>
                      <li>Result: 3/5</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Example 2 */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3B1E54]">Unlike Denominators Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#021526]">1/2 + 1/3</p>
                    <ol className="list-decimal pl-6 text-[#021526] space-y-2">
                      <li>Find LCD of 2 and 3 = 6</li>
                      <li>Convert fractions:
                        <ul className="list-disc pl-6 mt-1 text-[#021526]">
                          <li>1/2 = 3/6</li>
                          <li>1/3 = 2/6</li>
                        </ul>
                      </li>
                      <li>Add: 3/6 + 2/6 = 5/6</li>
                      <li>Result: 5/6</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips and Tricks */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl text-[#3B1E54]">Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#3B1E54]">Finding LCD</h4>
                  <p className="text-[#021526]">
                    List multiples of each denominator until you find the smallest number that appears in both lists.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#3B1E54]">Mixed Numbers</h4>
                  <p className="text-[#021526]">
                    Convert mixed numbers to improper fractions before adding or subtracting.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#3B1E54]">Simplifying</h4>
                  <p className="text-[#021526]">
                    Divide both numerator and denominator by their Greatest Common Factor (GCF).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Applications */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-[#3B1E54]">Real-World Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3B1E54]">Cooking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#021526]">
                    Combining ingredients: 1/2 cup flour + 1/4 cup flour = 3/4 cup flour for a recipe.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3B1E54]">Construction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#021526]">
                    Measuring wood lengths: 3/4 inch + 5/8 inch for precise measurements.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3B1E54]">Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#021526]">
                    Calculating parts of a budget: 1/3 savings + 1/2 expenses of monthly income.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Practice Problems */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-xl text-[#3B1E54]">Practice Problems</CardTitle>
              <CardDescription className="text-[#021526]">Try these problems to test your understanding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3B1E54]">Basic Level</h4>
                  <ul className="list-disc pl-6 text-[#021526]">
                    <li>1/4 + 3/4 = ?</li>
                    <li>2/3 - 1/3 = ?</li>
                    <li>1/5 + 2/5 = ?</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3B1E54]">Advanced Level</h4>
                  <ul className="list-disc pl-6 text-[#021526]">
                    <li>2/3 + 1/4 = ?</li>
                    <li>3/8 - 1/6 = ?</li>
                    <li>5/6 + 2/9 = ?</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
