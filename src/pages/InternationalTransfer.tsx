
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { CurrencyConverter } from "@/components/international-transfer/CurrencyConverter";
import { TransactionDetails } from "@/components/international-transfer/TransactionDetails";
import { Currency } from "@/types/currency";

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
      setCurrencies(data || []);
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

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from('international_transactions')
        .insert({
          amount_source: parseFloat(formData.amount),
          currency_source: formData.sourceCurrency,
          amount_target: convertedAmount,
          currency_target: formData.targetCurrency,
          recipient_id: formData.recipientId,
          sender_id: user.id,
          type: 'international_transfer',
          description: formData.description,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "International transfer initiated successfully",
      });

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

  const handleSwapCurrencies = () => {
    setFormData({
      ...formData,
      sourceCurrency: formData.targetCurrency,
      targetCurrency: formData.sourceCurrency,
    });
    setConvertedAmount(null);
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
            <CurrencyConverter
              amount={formData.amount}
              sourceCurrency={formData.sourceCurrency}
              targetCurrency={formData.targetCurrency}
              convertedAmount={convertedAmount}
              currencies={currencies}
              getCurrencySymbol={getCurrencySymbol}
              onValueChange={(value) => {
                setFormData({ ...formData, amount: value });
                setConvertedAmount(null);
              }}
              onSourceCurrencyChange={(value) => {
                setFormData({ ...formData, sourceCurrency: value });
                setConvertedAmount(null);
              }}
              onTargetCurrencyChange={(value) => {
                setFormData({ ...formData, targetCurrency: value });
                setConvertedAmount(null);
              }}
              onSwapCurrencies={handleSwapCurrencies}
              onCalculateConversion={calculateConversion}
            />

            <TransactionDetails
              recipientId={formData.recipientId}
              description={formData.description}
              onRecipientIdChange={(value) => setFormData({ ...formData, recipientId: value })}
              onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
            />
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
