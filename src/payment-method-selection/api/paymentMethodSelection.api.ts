import {
  PaymentMethod,
  PaymentMethodInfo,
} from "../types/paymentMethodSelection.types";

// Mock payment methods data
const MOCK_PAYMENT_METHODS: PaymentMethodInfo[] = [
  { id: "CARD", name: "Credit/Debit Card", icon: "card-icon" },
  { id: "BANK_TRANSFER", name: "Bank Transfer", icon: "bank-icon" },
  { id: "MOBILE_MONEY", name: "Mobile Money", icon: "mobile-icon" },
];

/**
 * API service for payment method selection functionality
 */
export const paymentMethodSelectionApi = {
  /**
   * Fetch available payment methods
   * @returns Promise resolving to array of payment methods
   */
  getPaymentMethods: async (): Promise<PaymentMethodInfo[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_PAYMENT_METHODS;
  },

  /**
   * Submit selected payment method
   * @param data Payment method data
   * @returns Promise resolving to success message
   */
  submitPaymentMethod: async (
    data: PaymentMethod
  ): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate validation
    if (!data.type) {
      throw new Error("Payment method is required");
    }

    return {
      success: true,
      message: "Payment method saved",
    };
  },
};
