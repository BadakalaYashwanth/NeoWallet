
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, ScanLine } from "lucide-react";

interface QRScannerProps {
  onScan: (result: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Expected QR code format for payments: 
// {"walletId":"WAL001","recipient":"Name","amount":1000,"description":"Payment for services"}

const QRScanner = ({ onScan, isOpen, onClose }: QRScannerProps) => {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && qrRef.current) {
      // Reset states when scanner is opened
      setHasCameraPermission(null);
      setScanError(null);
      
      scannerRef.current = new Html5Qrcode("qr-reader");
      
      scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          try {
            // Validate if the QR code contains valid payment data
            const paymentData = JSON.parse(decodedText);
            
            if (!paymentData.walletId) {
              throw new Error("Invalid payment QR code");
            }
            
            console.log("QR code scanned:", paymentData);
            onScan(decodedText);
            
            // Stop scanning after successful scan
            if (scannerRef.current && scannerRef.current.isScanning) {
              scannerRef.current.stop().catch(err => console.error("Error stopping scanner:", err));
            }
            
            // Provide a success toast
            toast({
              title: "QR Code Scanned Successfully",
              description: "Payment information detected",
              variant: "default",
            });
          } catch (error) {
            console.error("QR code parsing error:", error);
            setScanError("Invalid QR code format. Please scan a valid payment QR code.");
            toast({
              title: "Invalid QR Code",
              description: "Could not process QR code data",
              variant: "destructive",
            });
          }
        },
        (errorMessage) => {
          console.log("QR scanning error:", errorMessage);
        }
      ).catch((err) => {
        console.error("Camera access error:", err);
        setHasCameraPermission(false);
        setScanError("Camera access denied. Please enable camera permissions and try again.");
        toast({
          title: "Scanner Error",
          description: "Please ensure camera permissions are enabled",
          variant: "destructive",
        });
      });
      
      // Camera access granted
      setHasCameraPermission(true);
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error("Error stopping scanner on cleanup:", err));
      }
    };
  }, [isOpen, onScan, onClose, toast]);

  const handleRetryPermission = () => {
    // Close and reopen to trigger permission request again
    onClose();
    setTimeout(() => {
      setHasCameraPermission(null);
      setScanError(null);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Payment QR Code</DialogTitle>
          <DialogDescription>
            Position the QR code within the scanner area
          </DialogDescription>
        </DialogHeader>
        
        <div className="w-full aspect-square relative">
          {hasCameraPermission === false ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 bg-gray-800 rounded-lg p-6">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <p className="text-center text-white">{scanError || "Camera access denied"}</p>
              <Button onClick={handleRetryPermission}>
                Try Again
              </Button>
            </div>
          ) : scanError ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 bg-gray-800 rounded-lg p-6">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <p className="text-center text-white">{scanError}</p>
              <Button onClick={() => setScanError(null)}>
                Continue Scanning
              </Button>
            </div>
          ) : (
            <>
              <div id="qr-reader" ref={qrRef} className="w-full h-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <ScanLine className="h-64 w-64 text-purple-500 opacity-70" />
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-center">
          <p className="text-sm text-gray-400">
            Hold your device steady to scan the payment QR code
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
