
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Send, User, Wallet, CreditCard, CheckCircle2, Scan } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import QRScanner from "@/components/QRScanner";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Send Money</h1>
          <p className="text-muted-foreground mt-1">Transfer money to other NeoWallet users</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsQRScannerOpen(true)}
          className="bg-card hover:bg-muted transition-colors"
        >
          <Scan className="h-4 w-4 mr-2" />
          Scan QR
        </Button>
      </header>

      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleScan}
      />

      <Card className="shadow-sm max-w-2xl mx-auto">
        <CardContent className="p-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s !== 3 ? "flex-1" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors ${s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                >
                  {s}
                </div>
                {s !== 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${s < step ? "bg-primary" : "bg-muted"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Select Recipient</h2>
              <div className="grid gap-3">
                {mockRecipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedRecipient?.id === recipient.id
                        ? "bg-primary/5 border-primary"
                        : "bg-card hover:bg-muted/50 border-input"
                      }`}
                    onClick={() => setSelectedRecipient(recipient)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${selectedRecipient?.id === recipient.id ? "bg-primary/20" : "bg-muted"}`}>
                        <User className={`h-6 w-6 ${selectedRecipient?.id === recipient.id ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{recipient.name}</p>
                        <p className="text-sm text-muted-foreground">{recipient.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="w-full py-6 text-lg"
                onClick={() => selectedRecipient && setStep(2)}
                disabled={!selectedRecipient}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Enter Amount</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="text-foreground">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-bold mt-2"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="note" className="text-foreground">Add a note (optional)</Label>
                  <Input
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2"
                    placeholder="What's this for?"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-foreground">Payment Method</Label>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedPaymentMethod === method.id
                          ? "bg-primary/5 border-primary"
                          : "bg-card hover:bg-muted/50 border-input"
                        }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <method.icon className={`h-5 w-5 ${selectedPaymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className="font-medium text-foreground">{method.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {method.balance || method.info}
                            </p>
                          </div>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="w-full py-6 text-lg"
                onClick={() => amount && setStep(3)}
                disabled={!amount}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Confirm Payment</h2>
              <div className="space-y-4 p-4 bg-muted/40 rounded-lg border border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-foreground font-bold text-lg">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span className="text-foreground font-medium">{selectedRecipient?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Via</span>
                  <span className="text-foreground">
                    {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.label}
                  </span>
                </div>
                {note && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Note</span>
                    <span className="text-foreground italic">{note}</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="pin" className="text-foreground">Enter PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="mt-2 text-center text-lg tracking-widest"
                  placeholder="****"
                />
              </div>
              <Button
                className="w-full py-6 text-lg"
                onClick={handleSend}
                disabled={pin.length !== 4}
              >
                Send Money
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;
