import { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentMethod,
  PaymentMethodSchema,
} from "../types/paymentMethodSelection.types";
import {
  activePaymentMethodTypeAtom,
  paymentMethodsAtom,
  selectedPaymentMethodAtom,
  submitPaymentMethodAtom,
} from "../store/paymentMethodSelection.atoms";

/**
 * Custom hook for payment method selection functionality
 */
export const usePaymentMethodSelection = () => {
  // Local state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Jotai state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useAtom(
    selectedPaymentMethodAtom
  );
  const [activePaymentMethodType, setActivePaymentMethodType] = useAtom(
    activePaymentMethodTypeAtom
  );
  const paymentMethodsQuery = useAtomValue(paymentMethodsAtom);
  const submitPaymentMethod = useSetAtom(submitPaymentMethodAtom);

  // Form setup with React Hook Form + Zod
  const { control, handleSubmit, formState, reset, watch } =
    useForm<PaymentMethod>({
      resolver: zodResolver(PaymentMethodSchema),
      defaultValues: selectedPaymentMethod || { type: "CARD" },
    });

  // Watch for payment method type changes
  const watchedType = watch("type");

  // Update active payment method type when it changes in the form
  useEffect(() => {
    if (watchedType && watchedType !== activePaymentMethodType) {
      setActivePaymentMethodType(watchedType);
    }
  }, [watchedType, activePaymentMethodType, setActivePaymentMethodType]);

  // Reset form when selected payment method changes
  useEffect(() => {
    if (selectedPaymentMethod) {
      reset(selectedPaymentMethod);
    }
  }, [selectedPaymentMethod, reset]);

  // Select a payment method type
  const selectPaymentMethodType = (type: string) => {
    setActivePaymentMethodType(type);
    reset({ type: type as any });
  };

  // Handle payment method submission
  const handlePaymentSubmit = async (data: PaymentMethod) => {
    setLoading(true);
    setError(null);

    try {
      await submitPaymentMethod(data);
      setSelectedPaymentMethod(data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    formState,
    paymentMethods: paymentMethodsQuery.data,
    paymentMethodsLoading: paymentMethodsQuery.isLoading,
    activePaymentMethodType,
    selectPaymentMethodType,
    submitPaymentMethod: handlePaymentSubmit,
    loading,
    error,
  };
};
