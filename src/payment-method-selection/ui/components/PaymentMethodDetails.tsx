import React from "react";
import { Controller } from "react-hook-form";
import "./styles.css";

interface PaymentMethodDetailsProps {
  type: string;
  control: any;
  errors: any;
}

/**
 * Component that renders form fields specific to the selected payment method
 */
const PaymentMethodDetails: React.FC<PaymentMethodDetailsProps> = ({
  type,
  control,
  errors,
}) => {
  switch (type) {
    case "CARD":
      return (
        <div className="payment-method-details">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.cardNumber && (
              <span className="error-message">{errors.cardNumber.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <Controller
              name="cardholderName"
              control={control}
              render={({ field }) => (
                <input
                  id="cardholderName"
                  type="text"
                  placeholder="John Smith"
                  className={errors.cardholderName ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.cardholderName && (
              <span className="error-message">
                {errors.cardholderName.message}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
              <Controller
                name="expiryDate"
                control={control}
                render={({ field }) => (
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className={errors.expiryDate ? "error" : ""}
                    {...field}
                  />
                )}
              />
              {errors.expiryDate && (
                <span className="error-message">
                  {errors.expiryDate.message}
                </span>
              )}
            </div>

            <div className="form-group half">
              <label htmlFor="cvv">CVV</label>
              <Controller
                name="cvv"
                control={control}
                render={({ field }) => (
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className={errors.cvv ? "error" : ""}
                    {...field}
                  />
                )}
              />
              {errors.cvv && (
                <span className="error-message">{errors.cvv.message}</span>
              )}
            </div>
          </div>
        </div>
      );

    case "BANK_TRANSFER":
      return (
        <div className="payment-method-details">
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <Controller
              name="accountNumber"
              control={control}
              render={({ field }) => (
                <input
                  id="accountNumber"
                  type="text"
                  placeholder="12345678"
                  className={errors.accountNumber ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.accountNumber && (
              <span className="error-message">
                {errors.accountNumber.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="routingNumber">Routing Number</label>
            <Controller
              name="routingNumber"
              control={control}
              render={({ field }) => (
                <input
                  id="routingNumber"
                  type="text"
                  placeholder="123456789"
                  className={errors.routingNumber ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.routingNumber && (
              <span className="error-message">
                {errors.routingNumber.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="accountName">Account Holder Name</label>
            <Controller
              name="accountName"
              control={control}
              render={({ field }) => (
                <input
                  id="accountName"
                  type="text"
                  placeholder="John Smith"
                  className={errors.accountName ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.accountName && (
              <span className="error-message">
                {errors.accountName.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <input
                  id="bankName"
                  type="text"
                  placeholder="Bank of America"
                  className={errors.bankName ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.bankName && (
              <span className="error-message">{errors.bankName.message}</span>
            )}
          </div>
        </div>
      );

    case "MOBILE_MONEY":
      return (
        <div className="payment-method-details">
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="+1234567890"
                  className={errors.phoneNumber ? "error" : ""}
                  {...field}
                />
              )}
            />
            {errors.phoneNumber && (
              <span className="error-message">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="provider">Provider</label>
            <Controller
              name="provider"
              control={control}
              render={({ field }) => (
                <select
                  id="provider"
                  className={errors.provider ? "error" : ""}
                  {...field}
                >
                  <option value="">Select a provider</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="MTN Mobile Money">MTN Mobile Money</option>
                  <option value="Orange Money">Orange Money</option>
                  <option value="Airtel Money">Airtel Money</option>
                </select>
              )}
            />
            {errors.provider && (
              <span className="error-message">{errors.provider.message}</span>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className="payment-method-details">
          <p>Please select a payment method to continue</p>
        </div>
      );
  }
};

export default PaymentMethodDetails;
