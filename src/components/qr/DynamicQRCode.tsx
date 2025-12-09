
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { usePayments } from '@/hooks/usePayments';
import { QRPaymentPayload } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Share2, Copy, Download, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface DynamicQRCodeProps {
    walletId: string;
    amount?: number;
    currency?: string;
    note?: string;
    expirySeconds?: number; // default 300
}

export const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({
    walletId,
    amount,
    currency = 'USD',
    note,
    expirySeconds = 300
}) => {
    const { mockSignPayload } = usePayments();
    const [payload, setPayload] = useState<QRPaymentPayload | null>(null);
    const [qrValue, setQrValue] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState(expirySeconds);
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const generateQR = async () => {
        setIsLoading(true);
        setIsExpired(false);
        setTimeLeft(expirySeconds);

        try {
            const expiresAt = new Date(Date.now() + expirySeconds * 1000).toISOString();
            const nonce = crypto.randomUUID();

            const basePayload = {
                v: 1,
                walletId,
                amount,
                currency,
                note,
                expiresAt,
                nonce
            };

            const { sig } = await mockSignPayload(basePayload);

            const finalPayload: QRPaymentPayload = {
                ...basePayload,
                sig
            };

            setPayload(finalPayload);

            // Format: neowallet://pay?v=1&payload=<base64url>
            const jsonString = JSON.stringify(finalPayload);
            const base64 = btoa(jsonString);
            const uri = `neowallet://pay?v=1&payload=${base64}`;
            setQrValue(uri);

        } catch (error) {
            console.error("Failed to generate QR", error);
            toast.error("Failed to generate secure QR code");
        } finally {
            setIsLoading(false);
        }
    };

    // Initial Generation
    useEffect(() => {
        generateQR();
    }, [walletId, amount, currency, note]);

    // Timer Logic
    useEffect(() => {
        if (!payload || isExpired) return;

        const interval = setInterval(() => {
            const now = new Date();
            const expiry = new Date(payload.expiresAt);
            const diff = Math.ceil((expiry.getTime() - now.getTime()) / 1000);

            if (diff <= 0) {
                setTimeLeft(0);
                setIsExpired(true);
                clearInterval(interval);
            } else {
                setTimeLeft(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [payload, isExpired]);

    const handleCopy = () => {
        if (!qrValue) return;
        navigator.clipboard.writeText(qrValue);
        toast.success("Payment URI copied to clipboard");
    };

    const handleShare = async () => {
        if (!qrValue) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Pay NeoWallet User',
                    text: `Pay ${amount ? `${currency} ${amount}` : ''} to ${walletId}`,
                    url: qrValue
                });
            } catch (err) {
                console.log('Share dismissed');
            }
        } else {
            handleCopy();
        }
    };

    const handleDownload = () => {
        const svg = document.getElementById("neowallet-qr");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.fillStyle = "white"; // Add white background
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `neowallet-pay-${walletId}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <Card className="p-6 bg-surface border-border flex flex-col items-center gap-6 max-w-sm mx-auto shadow-lg transition-colors duration-300">
            {/* Header */}
            <div className="text-center space-y-1">
                <h3 className="font-semibold text-lg text-foreground">Scan to Pay</h3>
                <p className="text-sm text-muted-foreground">
                    {amount ? `Requesting ${currency} ${amount.toFixed(2)}` : 'Scanning for generic payment'}
                </p>
            </div>

            {/* QR Container */}
            <div className="relative group">
                <div
                    className={`p-4 bg-white rounded-xl border border-border transition-opacity duration-300
                    ${(isExpired || isLoading) ? 'opacity-20 blur-sm' : 'opacity-100'}`}
                >
                    {qrValue && (
                        <QRCode
                            id="neowallet-qr"
                            value={qrValue}
                            size={200}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                            fgColor="black" // Ensures high contrast on white bg
                            bgColor="white"
                        />
                    )}
                </div>

                {/* Overlays */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}

                {isExpired && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-destructive font-bold mb-2">Expired</span>
                        <Button size="sm" onClick={generateQR} variant="outline" className="bg-background">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                )}
            </div>

            {/* Timer & Controls */}
            <div className="w-full space-y-6">
                {/* Timer Status */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium" role="timer" aria-live="polite">
                    <Clock className={`w-4 h-4 ${timeLeft < 30 ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
                    <span className={timeLeft < 30 ? 'text-destructive' : 'text-muted-foreground'}>
                        {isExpired ? "QR Code Expired" : `Expires in ${formatTime(timeLeft)}`}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy} title="Copy Link">
                        <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} title="Share">
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} title="Download PNG">
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};
