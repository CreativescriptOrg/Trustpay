import React, { useRef, useState, Suspense } from "react";
import { PaymentMethodSelection } from "./payment-method-selection/ui/components/PaymentMethodSelection";
import {
  PaymentMethod,
  PaymentMethodSelectionRef,
} from "./payment-method-selection/types/paymentMethodSelection.types";
import "./payment-method-selection/ui/components/styles.css";

const steps = [
  { title: "Transaction Type" },
  { title: "Product Details" },
  { title: "Your Details" },
  { title: "Share Link" },
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const paymentMethodSelectionRef = useRef<PaymentMethodSelectionRef>(null);

  const handleNext = (data?: PaymentMethod) => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = () => {
    if (currentStep === 1 && paymentMethodSelectionRef.current) {
      paymentMethodSelectionRef.current.submitPaymentMethod();
    } else {
      handleNext();
    }
  };

  return (
    <div className="trustpay-app">
      <header className="app-header">
        <h1>TrustPay</h1>
      </header>

      <div className="step-progress">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-item ${currentStep === index + 1 ? "active" : ""} 
                           ${currentStep > index + 1 ? "completed" : ""}`}
          >
            <div className="step-circle">
              {currentStep > index + 1 ? "✓" : index + 1}
            </div>
            <div className="step-text">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="step-content">
        {currentStep === 1 && (
          <Suspense
            fallback={
              <div className="loading-indicator">
                Loading payment methods...
              </div>
            }
          >
            <PaymentMethodSelection
              ref={paymentMethodSelectionRef}
              onNext={handleNext}
            />
          </Suspense>
        )}

        {currentStep === 2 && (
          <div className="mock-step">
            <h2>Product Details</h2>
            <div className="form-group">
              <label htmlFor="productTitle">Product Title</label>
              <input
                id="productTitle"
                type="text"
                placeholder="e.g. iPhone 13 Pro 256GB Graphite - Excellent Condition"
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Product Description</label>
              <textarea
                id="productDescription"
                placeholder="e.g. Used for 1 year, battery health 89%, includes original charger and box. Minor scratches on the frame."
                rows={4}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Price</label>
              <input id="productPrice" type="text" placeholder="Rs. 45000" />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="mock-step">
            <h2>Your Details</h2>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" placeholder="John Smith" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" type="tel" placeholder="+1234567890" />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="mock-step">
            <h2>Share Link</h2>
            <div className="share-link-container">
              <p>Your transaction is ready to be shared!</p>
              <div className="link-box">
                https://trustpay.com/tx/abc123def456
              </div>
              <button className="primary">Copy Link</button>
            </div>
          </div>
        )}
      </div>

      <div className="bottom-action-bar">
        {currentStep > 1 && (
          <button className="secondary" onClick={handleBack}>
            Back
          </button>
        )}

        {currentStep < steps.length && (
          <button className="primary" onClick={handleSubmit}>
            Next
          </button>
        )}

        {currentStep === steps.length && (
          <button
            className="primary"
            onClick={() => alert("Transaction completed!")}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
