import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentMethod,
  PaymentMethodType,
  PaymentMethodSchema,
  CardPaymentSchema,
  BankTransferSchema,
  MobileMoneySchema,
} from "../types/paymentMethodSelection.types";
import {
  paymentMethodsQueryAtom,
  selectedPaymentMethodTypeAtom,
  paymentMethodDataAtom,
  combinedPaymentMethodAtom,
  submitPaymentMethodAtom,
  isSubmittingAtom,
  formErrorsAtom,
} from "../store/paymentMethodSelection.atoms";

/**
 * Custom hook to manage payment method selection state and logic
 */
export const usePaymentMethodSelection = () => {
  // Atoms
  const [selectedType, setSelectedType] = useAtom(
    selectedPaymentMethodTypeAtom
  );
  const [paymentData, setPaymentData] = useAtom(paymentMethodDataAtom);
  const combinedData = useAtomValue(combinedPaymentMethodAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);
  const setFormErrors = useSetAtom(formErrorsAtom);

  // Query for payment methods
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } =
    useAtomValue(paymentMethodsQueryAtom);

  // Mutation for submission
  const [{ status, error }, submitPaymentMethod] = useAtom(
    submitPaymentMethodAtom
  );

  // Get the appropriate schema based on selected payment method type
  const getSchemaForType = (type: PaymentMethodType | null) => {
    if (!type) return PaymentMethodSchema;

    switch (type) {
      case "CARD":
        return CardPaymentSchema;
      case "BANK_TRANSFER":
        return BankTransferSchema;
      case "MOBILE_MONEY":
        return MobileMoneySchema;
      default:
        return PaymentMethodSchema;
    }
  };

  // Form handling with react-hook-form and zod validation
  const form = useForm<PaymentMethod>({
    resolver: zodResolver(getSchemaForType(selectedType)),
    defaultValues: (paymentData as any) || {},
    mode: "onChange",
  });

  // Update the resolver when payment method type changes
  const updateFormValidation = () => {
    form.clearErrors();
    form.reset((paymentData as any) || {});
  };

  // Handle payment method type selection
  const handleSelectPaymentMethod = (type: PaymentMethodType) => {
    setSelectedType(type);

    // Initialize default values based on type
    const initialData: Partial<PaymentMethod> = { type };
    setPaymentData(initialData);

    // Reset form with new validation schema
    form.reset(initialData as any);
    updateFormValidation();
  };

  // Handle form field changes
  const handleFieldChange = (fieldName: string, value: any) => {
    setPaymentData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setFormErrors({});

      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        setIsSubmitting(false);
        return false;
      }

      // Get form data
      const formData = form.getValues();

      // Submit payment method
      if (formData && formData.type) {
        await submitPaymentMethod(formData as PaymentMethod);
        return true;
      }

      return false;
    } catch (err: any) {
      setFormErrors({ submit: err.message || "Submission failed" });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    selectedType,
    paymentData,
    combinedData,
    paymentMethods,
    isSubmitting,
    isLoadingPaymentMethods,
    submissionStatus: status,
    submissionError: error,
    form,

    // Actions
    handleSelectPaymentMethod,
    handleFieldChange,
    handleSubmit,
    updateFormValidation,
  };
};
