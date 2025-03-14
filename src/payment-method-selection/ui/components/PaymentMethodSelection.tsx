import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Form, Radio, Result, Skeleton, Toast } from "antd-mobile";
import { ExclamationCircleOutline } from "antd-mobile-icons";
import { usePaymentMethodSelection } from "../../hooks/usePaymentMethodSelection";
import { PaymentMethodDetails } from "./PaymentMethodDetails";
import {
  PaymentMethod,
  PaymentMethodType,
} from "../../types/paymentMethodSelection.types";

export interface PaymentMethodSelectionRef {
  submitPaymentMethod: () => Promise<boolean>;
}

interface PaymentMethodSelectionProps {
  onNext: () => void;
}

export const PaymentMethodSelection = forwardRef;
PaymentMethodSelectionRef,
  PaymentMethodSelectionProps >
    (({ onNext }, ref) => {
      const {
        selectedType,
        paymentMethods,
        isLoadingPaymentMethods,
        submissionStatus,
        submissionError,
        isSubmitting,
        handleSelectPaymentMethod,
        handleSubmit,
        form,
      } = usePaymentMethodSelection();

      const [error, setError] = useState<string | null>(null);

      // Expose methods to parent component via ref
      useImperativeHandle(ref, () => ({
        submitPaymentMethod: async () => {
          try {
            setError(null);
            const success = await handleSubmit();
            if (success) {
              onNext();
              return true;
            }
            return false;
          } catch (err: any) {
            setError(err.message || "Failed to submit payment method");
            return false;
          }
        },
      }));

      // Show toast notification when submission status changes
      useEffect(() => {
        if (submissionStatus === "error" && submissionError) {
          Toast.show({
            icon: <ExclamationCircleOutline />,
            content:
              submissionError.message || "Failed to submit payment method",
          });
        }
      }, [submissionStatus, submissionError]);

      // Handle payment method selection
      const onPaymentMethodChange = (value: PaymentMethodType) => {
        handleSelectPaymentMethod(value);
      };

      // Show loading skeleton while fetching payment methods
      if (isLoadingPaymentMethods) {
        return (
          <div className="p-4">
            <Skeleton animated className="w-full h-16 mb-4" />
            <Skeleton animated className="w-full h-40" />
          </div>
        );
      }

      // Show error message if payment methods couldn't be loaded
      if (!paymentMethods || paymentMethods.length === 0) {
        return (
          <Result
            status="error"
            title="Failed to load payment methods"
            description="Please try again later"
          />
        );
      }

      return (
        <div className="payment-method-selection p-4">
          <Form
            layout="vertical"
            form={form.control.form}
            requiredMarkStyle="none"
          >
            <Form.Header>Select a payment method</Form.Header>

            {/* Payment Method Selection */}
            <div className="payment-method-options mb-4">
              <Radio.Group
                value={selectedType || undefined}
                onChange={(value) =>
                  onPaymentMethodChange(value as PaymentMethodType)
                }
              >
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`
                    p-3 border rounded-lg flex items-center
                    ${
                      selectedType === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }
                  `}
                    >
                      <Radio value={method.id} className="pr-3" />
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3 flex items-center justify-center bg-gray-100 rounded-full">
                          {/* Icon would be an actual image in a real implementation */}
                          <span className="text-xl">{method.icon}</span>
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Radio.Group>
            </div>

            {/* Dynamic Payment Method Details */}
            {selectedType && (
              <div className="payment-method-details mt-6 border-t pt-4">
                <Form.Header>Enter payment details</Form.Header>
                <PaymentMethodDetails type={selectedType} />
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg">
                <ExclamationCircleOutline className="mr-2" />
                {error}
              </div>
            )}
          </Form>
        </div>
      );
    });
