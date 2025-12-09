
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { usePayments } from '@/hooks/usePayments';
import { QRPaymentPayload } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Camera, Upload, AlertCircle } from 'lucide-react';

interface QRCodeScannerProps {
    onScanSuccess: (data: QRPaymentPayload) => void;
    onError?: (error: string) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onError }) => {
    const { mockVerifySignature } = usePayments();
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, []);

    const processScannedText = async (decodedText: string) => {
        try {
            // Parse URI or JSON
            let payload: QRPaymentPayload;

            if (decodedText.startsWith('neowallet://pay')) {
                const url = new URL(decodedText);
                const base64 = url.searchParams.get('payload');
                if (!base64) throw new Error("Invalid Payment URI");
                const json = atob(base64);
                payload = JSON.parse(json);
            } else {
                // Try raw JSON
                payload = JSON.parse(decodedText);
            }

            // Verify
            await mockVerifySignature(payload);

            // Success
            if (scannerRef.current) {
                await scannerRef.current.stop();
                scannerRef.current.clear();
                setIsScanning(false);
            }
            onScanSuccess(payload);
            toast.success("QR Code Verified");

        } catch (err: any) {
            console.error("Scan Error", err);
            const msg = err.message || "Invalid QR Code";
            setError(msg);
            toast.error(msg);
            if (onError) onError(msg);
        }
    };

    const startCamera = async () => {
        setIsScanning(true);
        setError(null);

        try {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                    // formatsToSupport removed from here as per previous fix
                },
                processScannedText,
                (errorMessage) => {
                    // Ignore transient frame errors
                }
            );
        } catch (err) {
            console.error("Camera Error", err);
            setError("Camera permission denied or not available.");
            setIsScanning(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const html5QrCode = new Html5Qrcode("reader-file");

        html5QrCode.scanFile(file, true)
            .then(processScannedText)
            .catch(err => {
                setError("Could not read QR from image");
                toast.error("Could not read QR from image");
            });
    };

    const stopCamera = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch (e) {
                console.log(e);
            }
            setIsScanning(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <div className={`relative rounded-xl overflow-hidden bg-black border border-border min-h-[300px] flex items-center justify-center`}>
                {!isScanning && !error && (
                    <div className="text-center space-y-4 p-6">
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground text-sm">Scan a NeoWallet QR code to pay</p>
                        <Button onClick={startCamera}>Start Scanning</Button>
                        <div className="relative pt-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black px-2 text-muted-foreground">Or upload</span>
                            </div>
                        </div>
                        <label className="cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-2 w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </label>
                        <div id="reader-file" className="hidden"></div>
                    </div>
                )}

                {isScanning && (
                    <div className="w-full h-full">
                        <div id="reader" className="w-full h-full"></div>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
                            onClick={stopCamera}
                        >
                            Stop Camera
                        </Button>
                    </div>
                )}

                {error && (
                    <div className="text-center p-6 space-y-4">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                        <p className="text-destructive font-medium">{error}</p>
                        <Button variant="outline" onClick={() => setError(null)}>Try Again</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
