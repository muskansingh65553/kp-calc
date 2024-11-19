'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

interface MixedNumber {
  whole: string;
  numerator: string;
  denominator: string;
}

export default function MixedNumbersCalculator() {
  const [firstNumber, setFirstNumber] = useState<MixedNumber>({
    whole: '',
    numerator: '',
    denominator: ''
  });
  const [secondNumber, setSecondNumber] = useState<MixedNumber>({
    whole: '',
    numerator: '',
    denominator: ''
  });
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<string>('');

  const operations = [
    { value: 'add', label: 'Add (+)' },
    { value: 'subtract', label: 'Subtract (-)' },
    { value: 'multiply', label: 'Multiply (×)' },
    { value: 'divide', label: 'Divide (÷)' },
    { value: 'of', label: 'Of' },
  ];

  const handleCalculate = () => {
    // Convert mixed numbers to improper fractions
    const firstImproper = convertToImproperFraction(firstNumber);
    const secondImproper = convertToImproperFraction(secondNumber);
    
    let resultNumerator = 0;
    let resultDenominator = 1;

    switch (operation) {
      case 'add':
        resultNumerator = firstImproper.numerator * secondImproper.denominator + 
                         secondImproper.numerator * firstImproper.denominator;
        resultDenominator = firstImproper.denominator * secondImproper.denominator;
        break;
      case 'subtract':
        resultNumerator = firstImproper.numerator * secondImproper.denominator - 
                         secondImproper.numerator * firstImproper.denominator;
        resultDenominator = firstImproper.denominator * secondImproper.denominator;
        break;
      case 'multiply':
        resultNumerator = firstImproper.numerator * secondImproper.numerator;
        resultDenominator = firstImproper.denominator * secondImproper.denominator;
        break;
      case 'divide':
        resultNumerator = firstImproper.numerator * secondImproper.denominator;
        resultDenominator = firstImproper.denominator * secondImproper.numerator;
        break;
      case 'of':
        resultNumerator = firstImproper.numerator * secondImproper.numerator;
        resultDenominator = firstImproper.denominator * secondImproper.denominator;
        break;
    }

    const simplifiedResult = simplifyFraction(resultNumerator, resultDenominator);
    const mixedResult = convertToMixedNumber(simplifiedResult.numerator, simplifiedResult.denominator);
    setResult(formatResult(mixedResult));
  };

  const handleClear = () => {
    setFirstNumber({ whole: '', numerator: '', denominator: '' });
    setSecondNumber({ whole: '', numerator: '', denominator: '' });
    setOperation('add');
    setResult('');
  };

  const convertToImproperFraction = (mixedNum: MixedNumber) => {
    const whole = parseInt(mixedNum.whole) || 0;
    const numerator = parseInt(mixedNum.numerator) || 0;
    const denominator = parseInt(mixedNum.denominator) || 1;
    return {
      numerator: whole * denominator + numerator,
      denominator
    };
  };

  const simplifyFraction = (numerator: number, denominator: number) => {
    const gcd = findGCD(Math.abs(numerator), Math.abs(denominator));
    return {
      numerator: numerator / gcd,
      denominator: denominator / gcd
    };
  };

  const findGCD = (a: number, b: number): number => {
    return b === 0 ? a : findGCD(b, a % b);
  };

  const convertToMixedNumber = (numerator: number, denominator: number) => {
    const whole = Math.floor(Math.abs(numerator) / denominator);
    const remainingNumerator = Math.abs(numerator) % denominator;
    const isNegative = numerator < 0;
    
    return {
      whole: isNegative ? -whole : whole,
      numerator: remainingNumerator,
      denominator
    };
  };

  const formatResult = (mixedNum: MixedNumber) => {
    if (mixedNum.numerator === 0) {
      return `${mixedNum.whole}`;
    }
    if (mixedNum.whole === 0) {
      return `${mixedNum.numerator}/${mixedNum.denominator}`;
    }
    return `${mixedNum.whole} ${mixedNum.numerator}/${mixedNum.denominator}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3B1E54] mb-4 text-center">
            Mixed Numbers Calculator
          </h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            Calculate with mixed numbers, fractions, integers, whole numbers, and decimals
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/fractions" className="text-[#3B1E54] hover:text-purple-400 transition-colors">
              Fractions
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-purple-400">Mixed Numbers Calculator</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Number */}
            <div className="space-y-4">
              <label className="block text-[#3B1E54] font-medium">First Number</label>
              <div className="flex gap-2 items-end">
                <div>
                  <Input
                    type="number"
                    placeholder="Whole"
                    value={firstNumber.whole}
                    onChange={(e) => setFirstNumber({ ...firstNumber, whole: e.target.value })}
                    className="w-24"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Input
                    type="number"
                    placeholder="Numerator"
                    value={firstNumber.numerator}
                    onChange={(e) => setFirstNumber({ ...firstNumber, numerator: e.target.value })}
                    className="w-24 mb-2"
                  />
                  <div className="w-20 border-t border-gray-400"></div>
                  <Input
                    type="number"
                    placeholder="Denominator"
                    value={firstNumber.denominator}
                    onChange={(e) => setFirstNumber({ ...firstNumber, denominator: e.target.value })}
                    className="w-24 mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Second Number */}
            <div className="space-y-4">
              <label className="block text-[#3B1E54] font-medium">Second Number</label>
              <div className="flex gap-2 items-end">
                <div>
                  <Input
                    type="number"
                    placeholder="Whole"
                    value={secondNumber.whole}
                    onChange={(e) => setSecondNumber({ ...secondNumber, whole: e.target.value })}
                    className="w-24"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Input
                    type="number"
                    placeholder="Numerator"
                    value={secondNumber.numerator}
                    onChange={(e) => setSecondNumber({ ...secondNumber, numerator: e.target.value })}
                    className="w-24 mb-2"
                  />
                  <div className="w-20 border-t border-gray-400"></div>
                  <Input
                    type="number"
                    placeholder="Denominator"
                    value={secondNumber.denominator}
                    onChange={(e) => setSecondNumber({ ...secondNumber, denominator: e.target.value })}
                    className="w-24 mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operation Selection */}
          <div className="my-8">
            <label className="block text-[#3B1E54] font-medium mb-2">Operation</label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                {operations.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center my-8">
            <Button
              variant="outline"
              onClick={handleClear}
              className="px-8 py-2 border-2 border-[#3B1E54] text-[#3B1E54] hover:bg-[#3B1E54] hover:text-white transition-colors"
            >
              Clear
            </Button>
            <Button
              onClick={handleCalculate}
              className="px-8 py-2 bg-[#3B1E54] text-white hover:bg-[#2a1640] transition-colors"
            >
              Calculate
            </Button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-medium text-[#3B1E54] mb-2">Result:</h3>
              <p className="text-2xl font-bold text-[#3B1E54]">{result}</p>
            </div>
          )}

          {/* Widget Link */}
          <div className="mt-8 text-center">
            <Link
              href="#"
              className="text-[#3B1E54] hover:text-purple-400 transition-colors font-medium"
            >
              Get a Widget for this Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
