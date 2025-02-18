
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { CurrencyInput } from "./CurrencyInput";
import { Currency } from "@/types/currency";

interface CurrencyConverterProps {
  amount: string;
  sourceCurrency: string;
  targetCurrency: string;
  convertedAmount: number | null;
  currencies: Currency[];
  getCurrencySymbol: (currencyId: string) => string;
  onValueChange: (value: string) => void;
  onSourceCurrencyChange: (currency: string) => void;
  onTargetCurrencyChange: (currency: string) => void;
  onSwapCurrencies: () => void;
  onCalculateConversion: () => void;
}

export const CurrencyConverter = ({
  amount,
  sourceCurrency,
  targetCurrency,
  convertedAmount,
  currencies,
  getCurrencySymbol,
  onValueChange,
  onSourceCurrencyChange,
  onTargetCurrencyChange,
  onSwapCurrencies,
  onCalculateConversion,
}: CurrencyConverterProps) => {
  return (
    <div className="space-y-4">
      <CurrencyInput
        label="Amount"
        value={amount}
        currency={sourceCurrency}
        currencies={currencies}
        symbol={getCurrencySymbol(sourceCurrency)}
        onValueChange={onValueChange}
        onCurrencyChange={onSourceCurrencyChange}
      />

      <div className="flex justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onSwapCurrencies}
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
      </div>

      <CurrencyInput
        label="Converted Amount"
        value={convertedAmount?.toFixed(2) || ''}
        currency={targetCurrency}
        currencies={currencies}
        symbol={getCurrencySymbol(targetCurrency)}
        readOnly
        onValueChange={() => {}}
        onCurrencyChange={onTargetCurrencyChange}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onCalculateConversion}
        disabled={!amount}
      >
        Calculate Conversion
      </Button>
    </div>
  );
};
