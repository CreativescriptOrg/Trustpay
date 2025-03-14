import {
  PaymentMethod,
  PaymentMethodListItem,
  GetPaymentMethodsResponse,
  SubmitPaymentMethodResponse,
} from "../types/paymentMethodSelection.types";

// Mock API responses
const MOCK_PAYMENT_METHODS: PaymentMethodListItem[] = [
  { id: "card", name: "Credit/Debit Card", icon: "card-icon" },
  { id: "bank", name: "Bank Transfer", icon: "bank-icon" },
  { id: "mobile", name: "Mobile Money", icon: "mobile-icon" },
];

/**
 * API for payment method selection operations
 */
export const paymentMethodSelectionApi = {
  /**
   * Fetch available payment methods
   */
  getPaymentMethods: async (): Promise<PaymentMethodListItem[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_PAYMENT_METHODS;
  },

  /**
   * Submit selected payment method with details
   */
  submitPaymentMethod: async (
    data: PaymentMethod
  ): Promise<SubmitPaymentMethodResponse> => {
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
