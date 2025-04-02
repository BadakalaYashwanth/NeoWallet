
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Wallet, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

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
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Receive Money</h1>
        <p className="text-secondary-foreground">Request payments or share your wallet details</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Share Your Wallet ID</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wallet className="h-5 w-5 text-purple-500" />
                <span className="font-mono text-white">{walletId}</span>
              </div>
              <button
                onClick={handleCopyWalletId}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4 text-purple-500" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-lg max-w-[200px] mx-auto">
                <QRCode 
                  value={qrData}
                  size={180}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={handleShareQR}
                  className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Share2 className="h-4 w-4 text-purple-500" />
                  <span>Share QR Code</span>
                </button>
              </div>
              <p className="text-sm text-center text-gray-400 mt-4">
                Anyone can scan this QR code to instantly send money to your wallet
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Request Money</h2>
          <div className="space-y-6">
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
              <Label htmlFor="note" className="text-white">Add a note</Label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="What's this for?"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">
                QR code updates automatically based on the amount and note
              </p>
            </div>

            <button
              onClick={handleRequestMoney}
              className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Request Payment
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReceiveMoney;
