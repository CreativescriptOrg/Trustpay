import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { PaymentMethod } from "../types/paymentMethodSelection.types";
import { paymentMethodSelectionApi } from "../api/paymentMethodSelection.api";

// Atom to store the selected payment method
export const selectedPaymentMethodAtom = atom<PaymentMethod | null>(null);

// Atom to store the currently active payment method type
export const activePaymentMethodTypeAtom = atom<string | null>(null);

// Atom with query for fetching payment methods (using atomWithQuery instead of direct promise)
export const paymentMethodsAtom = atomWithQuery(() => ({
  queryKey: ["paymentMethods"],
  queryFn: async () => {
    return await paymentMethodSelectionApi.getPaymentMethods();
  },
}));

// Atom with mutation for submitting payment method
export const submitPaymentMethodAtom = atom(
  null,
  async (get, set, paymentMethod: PaymentMethod) => {
    return await paymentMethodSelectionApi.submitPaymentMethod(paymentMethod);
  }
);
