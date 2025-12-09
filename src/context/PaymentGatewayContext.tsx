
import React, { createContext, useState, useContext } from 'react';
import { Transaction, Refund, Dispute, WebhookDelivery, GatewayEventLog, RiskRule, MerchantSettings, TokenRequestPayload, CardToken } from "@/types/payment";
import { mockGatewayApi } from "@/lib/mockGatewayApi";

interface PaymentGatewayContextType {
    recentTransactions: Transaction[];
    disputes: Dispute[];
    webhookLogs: WebhookDelivery[];
    eventLogs: GatewayEventLog[];
    merchantSettings: MerchantSettings;
    riskRules: RiskRule[];
    isLoading: boolean;
    error: string | null;

    // Actions
    processPayment: (amount: number, currency: string, token: string, customer: any) => Promise<Transaction>;
    tokenizeCard: (payload: TokenRequestPayload) => Promise<CardToken>;
    updateRiskRule: (ruleId: string, updates: Partial<RiskRule>) => void;
    togglePaymentMethod: (methodId: string) => void;
    retryWebhook: (eventId: string) => Promise<void>;

    // QR Features
    mockSignPayload: (payload: any) => Promise<{ sig: string }>;
    mockVerifySignature: (payload: any) => Promise<boolean>;
    createPendingPayment: (details: { toWalletId: string; amount?: number; currency?: string; note?: string }) => void;
}

export const PaymentGatewayContext = createContext<PaymentGatewayContextType | undefined>(undefined);

export function PaymentGatewayProvider({ children }: { children: React.ReactNode }) {
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [disputes, setDisputes] = useState<Dispute[]>([]);
    const [webhookLogs, setWebhookLogs] = useState<WebhookDelivery[]>([]);
    const [eventLogs, setEventLogs] = useState<GatewayEventLog[]>([]);
    const [merchantSettings, setMerchantSettings] = useState<MerchantSettings>({
        paymentMethods: [
            { id: 'pm_card', type: 'card', label: 'Credit/Debit Card', enabled: true },
            { id: 'pm_upi', type: 'upi', label: 'UPI', enabled: true },
            { id: 'pm_netbanking', type: 'netbanking', label: 'Netbanking', enabled: false },
        ],
        settlementSchedule: 'daily',
        statementDescriptor: 'NEOWALLET *MERCHANT',
        apiKey: 'sk_test_51Mz...',
        environment: 'test'
    });
    const [riskRules, setRiskRules] = useState<RiskRule[]>([
        { id: 'rule_1', type: 'max_amount', value: '50000', action: 'flag', enabled: true, description: 'Flag transactions over 50k' },
        { id: 'rule_2', type: 'velocity', value: '5_per_hour', action: 'block', enabled: true, description: 'Block > 5 txns per hour' }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Helper to add log
    const addEventLog = (message: string, type: string, severity: 'info' | 'warning' | 'error' = 'info') => {
        setEventLogs(prev => [{
            id: `evt_${Date.now()}`,
            timestamp: new Date().toISOString(),
            message,
            type,
            severity
        }, ...prev]);
    };

    const processPayment = async (amount: number, currency: string, token: string, customer: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const txn = await mockGatewayApi.simulatePaymentAuthorization(amount, currency, token, customer);
            setRecentTransactions(prev => [txn, ...prev]);
            addEventLog(`Payment authorized: ${txn.id}`, 'payment_auth', 'info');
            return txn;
        } catch (err: any) {
            setError(err.message);
            addEventLog(`Payment failed: ${err.message}`, 'payment_failed', 'error');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const tokenizeCard = async (payload: TokenRequestPayload) => {
        try {
            return await mockGatewayApi.tokenizeCard(payload);
        } catch (err: any) {
            throw err;
        }
    };

    const updateRiskRule = (ruleId: string, updates: Partial<RiskRule>) => {
        setRiskRules(prev => prev.map(r => r.id === ruleId ? { ...r, ...updates } : r));
    };

    const togglePaymentMethod = (methodId: string) => {
        setMerchantSettings(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.map(pm => pm.id === methodId ? { ...pm, enabled: !pm.enabled } : pm)
        }));
    };

    const retryWebhook = async (eventId: string) => {
        // Mock retry logic
    };

    // QR Functions
    const mockSignPayload = async (payload: any) => {
        return await mockGatewayApi.mockSignPayload(payload);
    };

    const mockVerifySignature = async (payload: any) => {
        return await mockGatewayApi.mockVerifySignature(payload);
    };

    const createPendingPayment = (details: any) => {
        console.log("Creating pending payment:", details);
        addEventLog(`Mock Pending Payment created for ${details.toWalletId}`, 'qr_scan', 'info');
    };

    return (
        <PaymentGatewayContext.Provider value={{
            recentTransactions,
            disputes,
            webhookLogs,
            eventLogs,
            merchantSettings,
            riskRules,
            isLoading,
            error,
            processPayment,
            tokenizeCard,
            updateRiskRule,
            togglePaymentMethod,
            retryWebhook,
            mockSignPayload,
            mockVerifySignature,
            createPendingPayment
        }}>
            {children}
        </PaymentGatewayContext.Provider>
    );
}
