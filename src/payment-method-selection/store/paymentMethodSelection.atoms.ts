import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import {
  PaymentMethod,
  PaymentMethodType,
  PaymentMethodListItem,
} from "../types/paymentMethodSelection.types";
import { paymentMethodSelectionApi } from "../api/paymentMethodSelection.api";

/**
 * Atom for storing the available payment methods
 */
export const paymentMethodsQueryAtom = atomWithQuery(() => ({
  queryKey: ["paymentMethods"],
  queryFn: async () => {
    return await paymentMethodSelectionApi.getPaymentMethods();
  },
}));

/**
 * Atom for the currently selected payment method type
 */
export const selectedPaymentMethodTypeAtom = atom<PaymentMethodType | null>(
  null
);

/**
 * Atom for the complete payment method data including all fields
 */
export const paymentMethodDataAtom = atom<Partial<PaymentMethod> | null>(null);

/**
 * Derived atom that combines type and data
 */
export const combinedPaymentMethodAtom = atom((get) => {
  const type = get(selectedPaymentMethodTypeAtom);
  const data = get(paymentMethodDataAtom);

  if (!type || !data) return null;
  return { ...data, type };
});

/**
 * Mutation atom for submitting the payment method
 */
export const submitPaymentMethodAtom = atomWithMutation(() => ({
  mutationKey: ["submitPaymentMethod"],
  mutationFn: async (paymentMethod: PaymentMethod) => {
    return await paymentMethodSelectionApi.submitPaymentMethod(paymentMethod);
  },
}));

/**
 * Atom for tracking submission status
 */
export const isSubmittingAtom = atom(false);

/**
 * Atom for tracking form validation errors
 */
export const formErrorsAtom = atom<Record<string, string>>({});
