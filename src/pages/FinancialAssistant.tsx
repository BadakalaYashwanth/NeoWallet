
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FinancialAssistantMessage, FinancialInsight } from "@/components/financial-assistant/FinancialAssistantComponents";

// Mock transaction data
const mockTransactions = [
  { id: 1, amount: 1200, category: "Income", date: "2023-06-01", description: "Salary" },
  { id: 2, amount: -45, category: "Food", date: "2023-06-02", description: "Restaurant" },
  { id: 3, amount: -120, category: "Shopping", date: "2023-06-03", description: "Clothing" },
  { id: 4, amount: -30, category: "Entertainment", date: "2023-06-04", description: "Movie" },
  { id: 5, amount: -200, category: "Bills", date: "2023-06-05", description: "Electricity" },
  { id: 6, amount: -800, category: "Housing", date: "2023-06-05", description: "Rent" },
  { id: 7, amount: -60, category: "Transport", date: "2023-06-06", description: "Fuel" },
];

// Sample suggestions
const sampleQuestions = [
  "How much did I spend on food this month?",
  "What's my biggest expense category?",
  "How can I save more money?",
  "What's my financial health?",
  "Analyze my spending pattern"
];

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  loading?: boolean;
};

const FinancialAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", text: "Hello! I'm your financial assistant. How can I help you today?", isUser: false }
  ]);
  const [insights, setInsights] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMessageId, text: input, isUser: true }]);
    
    // Add loading message from assistant
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMessageId, text: "", isUser: false, loading: true }]);
    
    // Process the query
    setTimeout(() => {
      // Remove loading message and add response
      setMessages(prev => prev.filter(msg => !msg.loading));
      
      const response = generateResponse(input.toLowerCase());
      setMessages(prev => [...prev, { id: assistantMessageId, text: response.message, isUser: false }]);
      
      // Update insights if any
      if (response.insights && response.insights.length > 0) {
        setInsights(response.insights);
      }
      
      setInput("");
    }, 1500);
  };

  const generateResponse = (query: string) => {
    // Simple pattern matching for demo purposes
    if (query.includes("spend") && query.includes("food")) {
      const foodExpenses = mockTransactions
        .filter(t => t.category.toLowerCase() === "food" && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      return {
        message: `You've spent ₹${foodExpenses} on food this month. This is about 10% of your monthly expenses.`,
        insights: [
          {
            title: "Food Expenses",
            description: "Your food expenses are within a reasonable range (10% of total expenses).",
            color: "green",
            recommendations: ["Consider meal prepping to reduce restaurant expenses."]
          }
        ]
      };
    }
    
    if (query.includes("biggest expense") || query.includes("highest expense")) {
      // Group by category and find the largest one
      const expensesByCategory: Record<string, number> = {};
      mockTransactions.forEach(t => {
        if (t.amount < 0) {
          const category = t.category;
          expensesByCategory[category] = (expensesByCategory[category] || 0) + Math.abs(t.amount);
        }
      });
      
      let maxCategory = "";
      let maxAmount = 0;
      
      Object.entries(expensesByCategory).forEach(([category, amount]) => {
        if (amount > maxAmount) {
          maxCategory = category;
          maxAmount = amount;
        }
      });
      
      return {
        message: `Your biggest expense category is ${maxCategory} at ₹${maxAmount.toFixed(2)}, which is about ${Math.round((maxAmount / 1255) * 100)}% of your total expenses.`,
        insights: [
          {
            title: "Biggest Expense: " + maxCategory,
            description: `${maxCategory} takes up a significant portion of your monthly budget.`,
            color: maxCategory === "Housing" ? "blue" : "yellow",
            recommendations: [`Look for ways to reduce ${maxCategory.toLowerCase()} costs.`]
          }
        ]
      };
    }
    
    if (query.includes("save") && query.includes("money")) {
      return {
        message: "Based on your spending patterns, here are some ways you could save money:",
        insights: [
          {
            title: "Savings Opportunity",
            description: "You could save approximately ₹150 monthly by reducing discretionary expenses.",
            color: "green",
            recommendations: [
              "Cut subscription services you rarely use",
              "Reduce eating out by 1-2 meals per week",
              "Use public transportation more often"
            ]
          }
        ]
      };
    }
    
    if (query.includes("financial health") || query.includes("financial status")) {
      return {
        message: "I've analyzed your financial health based on your income, expenses, and savings rate.",
        insights: [
          {
            title: "Financial Health Score: 72/100",
            description: "Your financial health is good, but there's room for improvement.",
            color: "yellow",
            recommendations: [
              "Increase your emergency fund by 10%",
              "Reduce unnecessary expenses",
              "Consider additional income sources"
            ]
          }
        ]
      };
    }
    
    if (query.includes("spending pattern") || query.includes("analyze")) {
      return {
        message: "I've analyzed your spending patterns over the last month. Here's what I found:",
        insights: [
          {
            title: "Spending Analysis",
            description: "Your spending is highest on weekends and at the beginning of the month.",
            color: "blue",
            recommendations: [
              "Set a weekend budget limit",
              "Spread large purchases throughout the month",
              "Track expenses in real-time to stay within budget"
            ]
          },
          {
            title: "Category Breakdown",
            description: "Housing (40%), Food (15%), Transport (10%), Others (35%)",
            color: "purple",
            recommendations: [
              "Your housing costs are slightly above recommended thresholds"
            ]
          }
        ]
      };
    }
    
    // Default response for unrecognized queries
    return {
      message: "I don't have enough information to answer that specific question yet. As you use the app more, I'll be able to provide more personalized insights. Would you like me to analyze your general spending instead?",
      insights: []
    };
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    // Optionally auto-send the question
    // However, this might be annoying for users, so let them send it manually
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-bold text-white">Financial Assistant</h1>
        <p className="text-secondary-foreground">Get personalized financial insights and advice</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main chat area */}
        <div className="md:col-span-2 glass-card rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)]">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <FinancialAssistantMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  loading={message.loading}
                />
              ))}
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <div className="pt-4 border-t border-gray-800 mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                variant="default"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Sample questions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSampleQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Insights panel */}
        <div className="glass-card rounded-xl p-4 h-[calc(100vh-16rem)] overflow-hidden">
          <div className="flex items-center mb-4">
            <Bot className="mr-2 h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Financial Insights</h2>
          </div>
          
          <ScrollArea className="h-[calc(100%-3rem)]">
            {insights.length > 0 ? (
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <FinancialInsight
                    key={index}
                    title={insight.title}
                    description={insight.description}
                    color={insight.color}
                    recommendations={insight.recommendations}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Bot className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Ask me a question to get personalized financial insights</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default FinancialAssistant;
