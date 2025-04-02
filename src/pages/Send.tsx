import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Send, User, Wallet, CreditCard, CheckCircle2, Scan } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import QRScanner from "@/components/QRScanner";
import { useLocation } from "react-router-dom";

// Mock user data for testing
const mockRecipients = [
  { id: 1, name: "Rahul Kumar", email: "rahul@example.com", phone: "+91 98765 43210", walletId: "WAL001" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", phone: "+91 98765 43211", walletId: "WAL002" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", phone: "+91 98765 43212", walletId: "WAL003" },
  { id: 4, name: "Deepa Shah", email: "deepa@example.com", phone: "+91 98765 43213", walletId: "WAL004" },
  { id: 5, name: "Vikram Mehta", email: "vikram@example.com", phone: "+91 98765 43214", walletId: "WAL005" },
];

const paymentMethods = [
  { id: "wallet", label: "Wallet Balance", icon: Wallet, balance: "₹24,563.00" },
  { id: "upi", label: "UPI", icon: CreditCard, info: "Linked: 3 UPI IDs" },
  { id: "bank", label: "Bank Account", icon: CreditCard, info: "XXXX 4389" },
];

const SendMoney = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState<typeof mockRecipients[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  const [pin, setPin] = useState("");
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  // Process QR scan data from dashboard if available
  useEffect(() => {
    if (location.state?.paymentData) {
      try {
        const paymentData = location.state.paymentData;
        console.log("QR data received:", paymentData);
        
        // Find recipient by walletId
        const recipient = mockRecipients.find(r => r.walletId === paymentData.walletId);
        if (recipient) {
          setSelectedRecipient(recipient);
          
          // Set amount if provided
          if (paymentData.amount) {
            setAmount(paymentData.amount.toString());
          }
          
          // Set note if provided
          if (paymentData.description) {
            setNote(paymentData.description);
          }
          
          // Move to amount step
          setStep(2);
          
          toast({
            title: "Payment Details Loaded",
            description: `Ready to send money to ${recipient.name}`,
          });
        } else {
          toast({
            title: "Recipient Not Found",
            description: "Could not find the recipient in your contacts",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error processing payment data:", error);
        toast({
          title: "Error",
          description: "Failed to process payment data",
          variant: "destructive",
        });
      }
    }
  }, [location.state, toast]);

  const handleScan = (result: string) => {
    try {
      const scannedData = JSON.parse(result);
      console.log("QR scan result:", scannedData);
      
      // Find recipient by walletId
      const recipient = mockRecipients.find(r => r.walletId === scannedData.walletId);
      if (recipient) {
        setSelectedRecipient(recipient);
        if (scannedData.amount) {
          setAmount(scannedData.amount.toString());
        }
        if (scannedData.description) {
          setNote(scannedData.description);
        }
        setStep(2);
        
        toast({
          title: "QR Code Scanned",
          description: `Ready to send money to ${recipient.name}`,
        });
      } else {
        toast({
          title: "Invalid QR Code",
          description: "Recipient not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error scanning QR code:", error);
      toast({
        title: "Invalid QR Code",
        description: "Could not process QR code data",
        variant: "destructive",
      });
    }
  };

  const handleSend = () => {
    if (!amount || !selectedRecipient || !selectedPaymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (pin !== "1234") { // Mock PIN validation
      toast({
        title: "Error",
        description: "Invalid PIN",
        variant: "destructive",
      });
      return;
    }

    // Mock successful transaction
    toast({
      title: "Success!",
      description: `₹${amount} sent to ${selectedRecipient.name}`,
    });

    // Reset form
    setStep(1);
    setSelectedRecipient(null);
    setAmount("");
    setNote("");
    setPin("");
  };

  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Send Money</h1>
          <p className="text-secondary-foreground">Transfer money to other NeoWallet users</p>
        </div>
        <button
          onClick={() => setIsQRScannerOpen(true)}
          className="glass-card p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Scan className="h-6 w-6 text-purple-500" />
        </button>
      </header>

      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleScan}
      />

      <Card className="glass-card p-6 max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex items-center ${s !== 3 ? "flex-1" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s <= step ? "bg-purple-500 text-white" : "bg-white/10 text-gray-400"
                }`}
              >
                {s}
              </div>
              {s !== 3 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    s < step ? "bg-purple-500" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Select Recipient</h2>
            <div className="grid gap-4">
              {mockRecipients.map((recipient) => (
                <div
                  key={recipient.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedRecipient?.id === recipient.id
                      ? "bg-purple-500/20 border border-purple-500/50"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                  onClick={() => setSelectedRecipient(recipient)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-full">
                      <User className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{recipient.name}</p>
                      <p className="text-sm text-gray-400">{recipient.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => selectedRecipient && setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Enter Amount</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-white">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl font-bold bg-white/5 border-white/10 text-white"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="note" className="text-white">Add a note (optional)</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="What's this for?"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-white">Payment Method</Label>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? "bg-purple-500/20 border border-purple-500/50"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <method.icon className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-white">{method.label}</p>
                          <p className="text-sm text-gray-400">
                            {method.balance || method.info}
                          </p>
                        </div>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle2 className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() => amount && setStep(3)}
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Confirm Payment</h2>
            <div className="space-y-4 p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="text-white font-bold">₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To</span>
                <span className="text-white">{selectedRecipient?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Via</span>
                <span className="text-white">
                  {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.label}
                </span>
              </div>
              {note && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Note</span>
                  <span className="text-white">{note}</span>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="pin" className="text-white">Enter PIN</Label>
              <Input
                id="pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="****"
              />
            </div>
            <button
              className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              onClick={handleSend}
            >
              Send Money
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SendMoney;
