
import React from 'react';
import Calculator from "@/components/Calculator";
import { Calculator as CalculatorIcon } from "lucide-react";

const CalculatorPage = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">Calculator</h1>
        <p className="text-secondary-foreground">Perform basic and financial calculations</p>
      </header>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-6 p-3 bg-purple-100 rounded-full">
          <CalculatorIcon className="h-8 w-8 text-purple-600" />
        </div>
        <Calculator />
        
        <div className="mt-8 p-6 bg-white/90 border border-gray-200 shadow-md rounded-lg max-w-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Keyboard Shortcuts</h3>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">0-9</span> - Input numbers</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">+</span> - Addition</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">-</span> - Subtraction</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">*</span> - Multiplication</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">/</span> - Division</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">.</span> - Decimal point</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">%</span> - Percentage</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">Enter</span> or <span className="font-mono bg-gray-100 px-2 py-1 rounded">=</span> - Calculate result</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">Backspace</span> - Delete last digit</li>
            <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">Escape</span> - Clear calculator</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
