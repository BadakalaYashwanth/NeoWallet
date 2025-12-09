
import { Transaction, Refund, Dispute, CardToken, TokenRequestPayload, QRPaymentPayload } from "@/types/payment";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockGatewayApi = {
    // Simulate converting raw card data into a secure token
    tokenizeCard: async (payload: TokenRequestPayload): Promise<CardToken> => {
        await delay(1000); // Simulate network latency

        if (payload.number.length < 13) throw new Error("Invalid card number");

        return {
            id: `tok_${Math.random().toString(36).substring(2, 9)}`,
            last4: payload.number.slice(-4),
            brand: getCardBrand(payload.number),
            expiryMonth: payload.expiry.split('/')[0],
            expiryYear: payload.expiry.split('/')[1],
            fingerprint: `fing_${Math.random().toString(36).substring(2)}`
        };
    },

    // Simulate authorizing a payment
    simulatePaymentAuthorization: async (amount: number, currency: string, token: string, customer: any): Promise<Transaction> => {
        await delay(1500);

        if (Math.random() < 0.1) {
            throw new Error("Payment declined by issuer");
        }

        return {
            id: `txn_${Math.random().toString(36).substring(2, 9)}`,
            amount,
            currency,
            status: 'authorized',
            customerName: customer.name,
            customerEmail: customer.email,
            paymentMethod: 'card',
            createdAt: new Date().toISOString(),
            refunds: [],
            disputes: []
        };
    },

    // Simulate webhook delivery
    simulateWebhookDelivery: async (eventId: string, url: string): Promise<boolean> => {
        await delay(500);
        return Math.random() > 0.1; // 90% success rate
    },

    // Simulate signing a QR payload (Server-side HMAC)
    mockSignPayload: async (payload: Omit<QRPaymentPayload, 'sig'>): Promise<{ sig: string }> => {
        await delay(300); // Fast signing
        const canonical = JSON.stringify({
            v: payload.v,
            walletId: payload.walletId,
            amount: payload.amount,
            currency: payload.currency,
            nonce: payload.nonce,
            expiresAt: payload.expiresAt
        });

        // Simple mock hash
        const mockSig = `sig_${btoa(canonical).slice(0, 32)}`;
        return { sig: mockSig };
    },

    // Simulate verifying a QR payload
    mockVerifySignature: async (payload: QRPaymentPayload): Promise<boolean> => {
        await delay(500);

        // 1. Check Expiry
        if (new Date(payload.expiresAt) < new Date()) {
            throw new Error("QR Code expired");
        }

        // 2. Re-compute signature to verify
        const canonical = JSON.stringify({
            v: payload.v,
            walletId: payload.walletId,
            amount: payload.amount,
            currency: payload.currency,
            nonce: payload.nonce,
            expiresAt: payload.expiresAt
        });

        const expectedSig = `sig_${btoa(canonical).slice(0, 32)}`;

        if (payload.sig !== expectedSig) {
            throw new Error("Invalid signature: Payload tampered");
        }

        return true;
    }
};

// Helper
function getCardBrand(number: string): string {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'Amex';
    return 'Unknown';
}
