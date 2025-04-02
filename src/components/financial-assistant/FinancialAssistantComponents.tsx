
import React from "react";
import { Card } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialAssistantMessageProps {
  message: string;
  isUser: boolean;
  loading?: boolean;
}

export const FinancialAssistantMessage: React.FC<FinancialAssistantMessageProps> = ({
  message,
  isUser,
  loading = false
}) => {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3",
          isUser
            ? "bg-purple-600 text-white"
            : "bg-gray-800/80 text-white"
        )}
      >
        {loading ? (
          <div className="flex items-center">
            <LoaderCircle className="h-5 w-5 animate-spin mr-2" />
            <span>Thinking...</span>
          </div>
        ) : (
          <p className="whitespace-pre-line">{message}</p>
        )}
      </div>
    </div>
  );
};

interface FinancialInsightProps {
  title: string;
  description: string;
  color?: "green" | "red" | "yellow" | "blue" | "purple";
  recommendations?: string[];
}

export const FinancialInsight: React.FC<FinancialInsightProps> = ({
  title,
  description,
  color = "blue",
  recommendations = []
}) => {
  const colorClasses = {
    green: "border-green-500/30 bg-green-500/10",
    red: "border-red-500/30 bg-red-500/10",
    yellow: "border-yellow-500/30 bg-yellow-500/10",
    blue: "border-blue-500/30 bg-blue-500/10",
    purple: "border-purple-500/30 bg-purple-500/10"
  };

  const textColorClasses = {
    green: "text-green-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
    blue: "text-blue-500",
    purple: "text-purple-500"
  };

  return (
    <Card className={cn("border p-4", colorClasses[color])}>
      <h3 className={cn("font-semibold mb-2", textColorClasses[color])}>
        {title}
      </h3>
      <p className="text-sm text-gray-300 mb-3">{description}</p>
      
      {recommendations.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs font-semibold text-gray-400 mb-1">RECOMMENDATIONS</h4>
          <ul className="text-xs space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className={cn("mr-1.5 text-lg leading-tight", textColorClasses[color])}>•</span>
                <span className="text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
