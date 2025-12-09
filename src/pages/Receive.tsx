
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Wallet, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

const ReceiveMoney = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [qrData, setQrData] = useState("");
  const walletId = "WAL001"; // Mock wallet ID
  const userName = "Rahul Kumar"; // Mock user name

  // Generate QR code data whenever amount or note changes
  useEffect(() => {
    const data = {
      walletId,
      recipient: userName,
      amount: amount ? parseFloat(amount) : "",
      description: note
    };
    setQrData(JSON.stringify(data));
  }, [amount, note]);

  const handleCopyWalletId = () => {
    navigator.clipboard.writeText(walletId);
    toast({
      title: "Copied!",
      description: "Wallet ID copied to clipboard",
    });
  };

  const handleShareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: "Payment QR Code",
        text: `Send money to ${userName} (₹${amount || "0"})`,
      }).catch(error => {
        console.error("Error sharing:", error);
      });
    } else {
      toast({
        title: "Share unavailable",
        description: "Sharing is not supported on this device",
        variant: "destructive",
      });
    }
  };

  const handleRequestMoney = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Payment request has been sent",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary tracking-tight">Receive Money</h1>
        <p className="text-muted-foreground mt-1">Request payments or share your wallet details</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Share Your Wallet ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <span className="font-mono text-lg font-semibold text-foreground">{walletId}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyWalletId}
                className="hover:bg-primary/10 text-primary"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col items-center pt-4">
              <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
                <QRCode
                  value={qrData}
                  size={180}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="mt-6 flex items-center justify-center w-full">
                <Button
                  variant="outline"
                  onClick={handleShareQR}
                  className="w-full max-w-xs"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share QR Code
                </Button>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-4">
                Anyone can scan this QR code to instantly send money to your wallet
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Request Money</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label htmlFor="note" className="text-foreground">Add a note</Label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2"
                placeholder="What's this for?"
              />
            </div>

            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
              QR code updates automatically based on the amount and note
            </div>

            <Button
              onClick={handleRequestMoney}
              className="w-full py-6 text-lg"
            >
              Request Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceiveMoney;
