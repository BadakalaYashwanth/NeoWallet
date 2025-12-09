
import { useContext } from "react";
import { PaymentGatewayContext } from "@/context/PaymentGatewayContext";

export const usePayments = () => {
    const context = useContext(PaymentGatewayContext);
    if (!context) {
        throw new Error("usePayments must be used within a PaymentGatewayProvider");
    }
    return context;
};
