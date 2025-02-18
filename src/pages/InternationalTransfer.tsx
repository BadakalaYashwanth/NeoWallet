
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowRightLeft } from "lucide-react";

interface Currency {
  id: string;
  name: string;
  symbol: string;
  rate: number;
}

const InternationalTransfer = () => {
  const { toast } = useToast();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    sourceCurrency: "USD",
    targetCurrency: "INR",
    recipientId: "",
    description: "",
  });
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .order('name');

      if (error) throw error;
      setCurrencies(data);
    } catch (error) {
      console.error('Error fetching currencies:', error);
      toast({
        title: "Error",
        description: "Failed to load currencies",
        variant: "destructive",
      });
    }
  };

  const calculateConversion = async () => {
    if (!formData.amount) {
      setConvertedAmount(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .rpc('convert_currency', {
          amount: parseFloat(formData.amount),
          from_currency: formData.sourceCurrency,
          to_currency: formData.targetCurrency,
        });

      if (error) throw error;
      setConvertedAmount(data);
    } catch (error) {
      console.error('Error converting currency:', error);
      toast({
        title: "Error",
        description: "Failed to convert currency",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!convertedAmount) {
        throw new Error("Please calculate conversion first");
      }

      const { error } = await supabase
        .from('international_transactions')
        .insert({
          amount_source: parseFloat(formData.amount),
          currency_source: formData.sourceCurrency,
          amount_target: convertedAmount,
          currency_target: formData.targetCurrency,
          recipient_id: formData.recipientId,
          type: 'international_transfer',
          description: formData.description,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "International transfer initiated successfully",
      });

      // Reset form
      setFormData({
        amount: "",
        sourceCurrency: "USD",
        targetCurrency: "INR",
        recipientId: "",
        description: "",
      });
      setConvertedAmount(null);
    } catch (error) {
      console.error('Error creating international transaction:', error);
      toast({
        title: "Error",
        description: "Failed to create international transfer",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrencySymbol = (currencyId: string) => {
    const currency = currencies.find(c => c.id === currencyId);
    return currency?.symbol || '';
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">International Transfer</h1>
        <p className="text-secondary-foreground">Send money internationally</p>
      </header>

      <Card className="glass-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {getCurrencySymbol(formData.sourceCurrency)}
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => {
                        setFormData({ ...formData, amount: e.target.value });
                        setConvertedAmount(null);
                      }}
                      className="pl-8"
                      placeholder="0.00"
                    />
                  </div>
                  <Select
                    value={formData.sourceCurrency}
                    onValueChange={(value) => {
                      setFormData({ ...formData, sourceCurrency: value });
                      setConvertedAmount(null);
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      sourceCurrency: formData.targetCurrency,
                      targetCurrency: formData.sourceCurrency,
                    });
                    setConvertedAmount(null);
                  }}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label>Converted Amount</Label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {getCurrencySymbol(formData.targetCurrency)}
                    </span>
                    <Input
                      readOnly
                      value={convertedAmount?.toFixed(2) || ''}
                      className="pl-8"
                      placeholder="0.00"
                    />
                  </div>
                  <Select
                    value={formData.targetCurrency}
                    onValueChange={(value) => {
                      setFormData({ ...formData, targetCurrency: value });
                      setConvertedAmount(null);
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={calculateConversion}
                disabled={!formData.amount}
              >
                Calculate Conversion
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="recipientId">Recipient ID</Label>
                <Input
                  id="recipientId"
                  value={formData.recipientId}
                  onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
                  placeholder="Enter recipient's ID"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What's this transfer for?"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !convertedAmount || !formData.recipientId}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Send International Transfer"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default InternationalTransfer;
