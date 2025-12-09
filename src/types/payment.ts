
export type PaymentMethodType = 'card' | 'upi' | 'netbanking' | 'wallet';

export type TransactionStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded' | 'partially_refunded' | 'disputed';

export interface PaymentMethod {
    id: string;
    type: PaymentMethodType;
    label: string;
    enabled: boolean;
}

export interface TokenRequestPayload {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
}

export interface CardToken {
    id: string;
    last4: string;
    brand: string;
    expiryMonth: string;
    expiryYear: string;
    fingerprint: string;
}

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    customerName: string;
    customerEmail: string;
    paymentMethod: PaymentMethodType;
    createdAt: string;
    description?: string;
    metadata?: Record<string, any>;
    refunds: Refund[];
    disputes: Dispute[];
}

export interface Refund {
    id: string;
    transactionId: string;
    amount: number;
    reason: string;
    status: 'pending' | 'processed' | 'failed';
    createdAt: string;
}

export type DisputeStatus = 'open' | 'under_review' | 'closed' | 'won' | 'lost';

export interface Dispute {
    id: string;
    transactionId: string;
    amount: number;
    reason: string;
    status: DisputeStatus;
    createdAt: string;
    evidence?: string[];
}

export interface WebhookDelivery {
    id: string;
    eventId: string;
    url: string;
    status: 'success' | 'failed' | 'retrying';
    payload: any;
    timestamp: string;
    attempts: number;
}

export interface GatewayEventLog {
    id: string;
    type: string;
    message: string;
    severity: 'info' | 'warning' | 'error';
    timestamp: string;
    metadata?: any;
}

export interface RiskRule {
    id: string;
    type: 'velocity' | 'bin_blacklist' | 'ip_blocklist' | 'max_amount';
    value: string;
    action: 'block' | 'review' | 'flag';
    enabled: boolean;
    description?: string;
}

export interface MerchantSettings {
    paymentMethods: PaymentMethod[];
    settlementSchedule: 'daily' | 'weekly' | 'manual';
    statementDescriptor: string;
    apiKey: string;
    environment: 'test' | 'live';
}

export interface QRPaymentPayload {
    v: number;
    walletId: string;
    amount?: number;
    currency?: string;
    note?: string;
    expiresAt: string;
    nonce: string;
    sig?: string;
}

export interface QRPaymentResponse {
    success: boolean;
    data?: QRPaymentPayload;
    error?: string;
}
