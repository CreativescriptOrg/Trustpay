import React from "react";
import { Form, Input, Radio } from "antd-mobile";
import { Controller } from "react-hook-form";
import { PaymentMethodType } from "../../types/paymentMethodSelection.types";
import { usePaymentMethodSelection } from "../../hooks/usePaymentMethodSelection";

interface PaymentMethodDetailsProps {
  type: PaymentMethodType;
}

/**
 * Component that renders the appropriate form fields based on the selected payment method
 */
export const PaymentMethodDetails: React.FC<PaymentMethodDetailsProps> = ({
  type,
}) => {
  const { form } = usePaymentMethodSelection();
  const {
    control,
    formState: { errors },
  } = form;

  // Render card payment form fields
  const renderCardFields = () => (
    <>
      <Form.Item
        label="Card Number"
        extra={errors.cardNumber?.message}
        className={errors.cardNumber ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter 16-digit card number"
              maxLength={16}
              className="w-full"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Cardholder Name"
        extra={errors.cardholderName?.message}
        className={errors.cardholderName ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="cardholderName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter name as it appears on card"
              className="w-full"
            />
          )}
        />
      </Form.Item>

      <div className="flex space-x-4">
        <Form.Item
          label="Expiry Date"
          extra={errors.expiryDate?.message}
          className={`w-1/2 ${
            errors.expiryDate ? "adm-form-item-has-error" : ""
          }`}
        >
          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="CVV"
          extra={errors.cvv?.message}
          className={`w-1/2 ${errors.cvv ? "adm-form-item-has-error" : ""}`}
        >
          <Controller
            name="cvv"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="3-4 digits"
                maxLength={4}
                type="password"
                className="w-full"
              />
            )}
          />
        </Form.Item>
      </div>
    </>
  );

  // Render bank transfer form fields
  const renderBankTransferFields = () => (
    <>
      <Form.Item
        label="Bank Name"
        extra={errors.bankName?.message}
        className={errors.bankName ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="bankName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter bank name"
              className="w-full"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Account Holder Name"
        extra={errors.accountHolderName?.message}
        className={errors.accountHolderName ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="accountHolderName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter account holder name"
              className="w-full"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Account Number"
        extra={errors.accountNumber?.message}
        className={errors.accountNumber ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="accountNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter account number"
              className="w-full"
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Routing Number (Optional)"
        extra={errors.routingNumber?.message}
        className={errors.routingNumber ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="routingNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter routing number"
              className="w-full"
            />
          )}
        />
      </Form.Item>
    </>
  );

  // Render mobile money form fields
  const renderMobileMoneyFields = () => (
    <>
      <Form.Item
        label="Mobile Provider"
        extra={errors.provider?.message}
        className={errors.provider ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field} className="w-full">
              <div className="flex flex-col space-y-2">
                <Radio value="MTN">MTN Mobile Money</Radio>
                <Radio value="Vodafone">Vodafone Cash</Radio>
                <Radio value="Airtel">Airtel Money</Radio>
                <Radio value="Other">Other</Radio>
              </div>
            </Radio.Group>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        extra={errors.phoneNumber?.message}
        className={errors.phoneNumber ? "adm-form-item-has-error" : ""}
      >
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter phone number with country code"
              className="w-full"
            />
          )}
        />
      </Form.Item>
    </>
  );

  // Render the appropriate fields based on payment method type
  switch (type) {
    case "CARD":
      return renderCardFields();
    case "BANK_TRANSFER":
      return renderBankTransferFields();
    case "MOBILE_MONEY":
      return renderMobileMoneyFields();
    default:
      return <p>Please select a payment method</p>;
  }
};
