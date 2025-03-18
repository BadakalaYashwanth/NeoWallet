
import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface QRScannerProps {
  onScan: (result: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const QRScanner = ({ onScan, isOpen, onClose }: QRScannerProps) => {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (isOpen && qrRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
      
      scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          try {
            onScan(decodedText);
            onClose();
            toast({
              title: "QR Code Scanned",
              description: "Payment details loaded successfully",
            });
          } catch (error) {
            toast({
              title: "Invalid QR Code",
              description: "Could not process QR code data",
              variant: "destructive",
            });
          }
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      ).catch((err) => {
        toast({
          title: "Scanner Error",
          description: "Please ensure camera permissions are enabled",
          variant: "destructive",
        });
      });
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error(err));
      }
    };
  }, [isOpen, onScan, onClose, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
        </DialogHeader>
        <div className="w-full aspect-square relative">
          <div id="qr-reader" ref={qrRef} className="w-full h-full"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
