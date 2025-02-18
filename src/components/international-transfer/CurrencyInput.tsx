
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Currency } from "@/types/currency";

interface CurrencyInputProps {
  label: string;
  value: string;
  currency: string;
  currencies: Currency[];
  symbol: string;
  readOnly?: boolean;
  onValueChange: (value: string) => void;
  onCurrencyChange: (currency: string) => void;
}

export const CurrencyInput = ({
  label,
  value,
  currency,
  currencies,
  symbol,
  readOnly = false,
  onValueChange,
  onCurrencyChange,
}: CurrencyInputProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {symbol}
          </span>
          <Input
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="pl-8"
            placeholder="0.00"
            readOnly={readOnly}
          />
        </div>
        <Select
          value={currency}
          onValueChange={onCurrencyChange}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((curr) => (
              <SelectItem key={curr.id} value={curr.id}>
                {curr.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
