
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, X, Divide, RotateCcw, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    if (firstOperand === null || operator === null) return parseFloat(display);

    const inputValue = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+':
        result = firstOperand + inputValue;
        break;
      case '-':
        result = firstOperand - inputValue;
        break;
      case '*':
        result = firstOperand * inputValue;
        break;
      case '/':
        result = inputValue !== 0 ? firstOperand / inputValue : 0;
        break;
      case '%':
        result = firstOperand % inputValue;
        break;
      default:
        return inputValue;
    }

    return Math.round(result * 1000000) / 1000000; // Handle floating point precision
  };

  const calculateResult = () => {
    if (firstOperand === null || operator === null) return;

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handlePercentage = () => {
    const inputValue = parseFloat(display);
    const result = inputValue / 100;
    setDisplay(String(result));
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.includes('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle numeric keys (0-9)
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      inputDigit(e.key);
    }
    // Handle operators
    else if (['+', '-', '*', '/'].includes(e.key)) {
      e.preventDefault();
      handleOperator(e.key);
    }
    // Handle equals and Enter
    else if (e.key === '=' || e.key === 'Enter') {
      e.preventDefault();
      calculateResult();
    }
    // Handle decimal point
    else if (e.key === '.') {
      e.preventDefault();
      inputDecimal();
    }
    // Handle Escape key for clear
    else if (e.key === 'Escape') {
      e.preventDefault();
      clearDisplay();
    }
    // Handle Backspace
    else if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
    }
    // Handle percentage
    else if (e.key === '%') {
      e.preventDefault();
      handlePercentage();
    }
  };

  useEffect(() => {
    // Add event listener for keyboard input
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, firstOperand, operator, waitingForSecondOperand]);

  const calculatorButton = (content: React.ReactNode, onClick: () => void, className?: string) => (
    <Button
      variant="outline"
      className={cn("h-14 text-xl font-medium", className)}
      onClick={onClick}
    >
      {content}
    </Button>
  );

  return (
    <Card className="w-full max-w-md mx-auto glass-card p-4">
      <div className="mb-4 bg-black/20 p-4 rounded-md text-right">
        <div className="text-3xl font-bold text-white truncate">{display}</div>
        {operator && (
          <div className="text-sm text-gray-400">
            {firstOperand} {operator}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* First row */}
        {calculatorButton('C', clearDisplay, "bg-red-500/20 hover:bg-red-500/30 text-red-500")}
        {calculatorButton(<RotateCcw size={18} />, handleBackspace)}
        {calculatorButton(<Percent size={18} />, handlePercentage)}
        {calculatorButton(<Divide size={18} />, () => handleOperator('/'), "bg-purple-500/20 hover:bg-purple-500/30 text-purple-500")}

        {/* Second row */}
        {calculatorButton('7', () => inputDigit('7'))}
        {calculatorButton('8', () => inputDigit('8'))}
        {calculatorButton('9', () => inputDigit('9'))}
        {calculatorButton(<X size={18} />, () => handleOperator('*'), "bg-purple-500/20 hover:bg-purple-500/30 text-purple-500")}

        {/* Third row */}
        {calculatorButton('4', () => inputDigit('4'))}
        {calculatorButton('5', () => inputDigit('5'))}
        {calculatorButton('6', () => inputDigit('6'))}
        {calculatorButton(<Minus size={18} />, () => handleOperator('-'), "bg-purple-500/20 hover:bg-purple-500/30 text-purple-500")}

        {/* Fourth row */}
        {calculatorButton('1', () => inputDigit('1'))}
        {calculatorButton('2', () => inputDigit('2'))}
        {calculatorButton('3', () => inputDigit('3'))}
        {calculatorButton(<Plus size={18} />, () => handleOperator('+'), "bg-purple-500/20 hover:bg-purple-500/30 text-purple-500")}

        {/* Fifth row */}
        {calculatorButton('00', () => inputDigit('00'))}
        {calculatorButton('0', () => inputDigit('0'))}
        {calculatorButton('.', inputDecimal)}
        {calculatorButton('=', calculateResult, "bg-green-500/20 hover:bg-green-500/30 text-green-500")}
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-400">
        <p>Keyboard shortcuts: Numbers, +, -, *, /, =, Enter, Backspace, Esc</p>
      </div>
    </Card>
  );
};

export default Calculator;
