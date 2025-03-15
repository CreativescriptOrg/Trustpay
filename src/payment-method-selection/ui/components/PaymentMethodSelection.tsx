import { forwardRef, useImperativeHandle } from "react";
import { Controller } from "react-hook-form";
import PaymentMethodDetails from "./PaymentMethodDetails";
import { usePaymentMethodSelection } from "../../hooks/usePaymentMethodSelection";
import {
  PaymentMethod,
  PaymentMethodSelectionProps,
  PaymentMethodSelectionRef,
} from "././../../types/paymentMethodSelection.types";

/**
 * Payment Method Selection component
 * Allows users to select and configure their payment method
 */
export const PaymentMethodSelection = forwardRef<
  PaymentMethodSelectionRef,
  PaymentMethodSelectionProps
>(({ onNext }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    paymentMethods,
    paymentMethodsLoading,
    activePaymentMethodType,
    selectPaymentMethodType,
    submitPaymentMethod,
    loading,
    error,
  } = usePaymentMethodSelection();

  // Form submission handler
  const onSubmit = async (data: PaymentMethod) => {
    const success = await submitPaymentMethod(data);
    if (success) {
      onNext(data);
    }
  };

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    submitPaymentMethod: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <div className="payment-method-selection">
      <h2>Select Payment Method</h2>

      {/* Loading state */}
      {(loading || paymentMethodsLoading) && (
        <div className="loading-indicator">Loading...</div>
      )}

      {/* Error message */}
      {error && <div className="error-notification">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden field for payment method type */}
        <Controller
          name="type"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />

        {/* Payment method options */}
        <div className="payment-method-options">
          {paymentMethods &&
            paymentMethods.map((method: any) => (
              <div
                key={method.id}
                className={`payment-method-option ${
                  activePaymentMethodType === method.id ? "active" : ""
                }`}
                onClick={() => selectPaymentMethodType(method.id)}
              >
                <div className="payment-method-icon">
                  {/* Replace with actual icons later */}
                  {method.icon === "card-icon" && <span>💳</span>}
                  {method.icon === "bank-icon" && <span>🏦</span>}
                  {method.icon === "mobile-icon" && <span>📱</span>}
                </div>
                <div className="payment-method-name">{method.name}</div>
              </div>
            ))}
        </div>

        {/* Payment method specific details */}
        {activePaymentMethodType && (
          <PaymentMethodDetails
            type={activePaymentMethodType}
            control={control}
            errors={errors}
          />
        )}
      </form>
    </div>
  );
});

export default PaymentMethodSelection;
