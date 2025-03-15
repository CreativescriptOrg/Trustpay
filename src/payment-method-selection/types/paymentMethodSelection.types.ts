import { z } from "zod";

// Credit/Debit Card schema
export const CardPaymentSchema = z.object({
  type: z.literal("CARD"),
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  cardholderName: z.string().min(3, "Cardholder name is required"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    ),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
});

// Bank Transfer schema
export const BankTransferSchema = z.object({
  type: z.literal("BANK_TRANSFER"),
  accountNumber: z.string().min(8, "Account number must be at least 8 digits"),
  routingNumber: z.string().min(9, "Routing number must be at least 9 digits"),
  accountName: z.string().min(3, "Account name is required"),
  bankName: z.string().min(2, "Bank name is required"),
});

// Mobile Money schema
export const MobileMoneySchema = z.object({
  type: z.literal("MOBILE_MONEY"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  provider: z.string().min(2, "Provider name is required"),
});

// Combined schema for all payment methods
export const PaymentMethodSchema = z.discriminatedUnion("type", [
  CardPaymentSchema,
  BankTransferSchema,
  MobileMoneySchema,
]);

// Type definitions derived from Zod schemas
export type CardPayment = z.infer<typeof CardPaymentSchema>;
export type BankTransfer = z.infer<typeof BankTransferSchema>;
export type MobileMoney = z.infer<typeof MobileMoneySchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// Interface for PaymentMethodSelection component ref
export interface PaymentMethodSelectionRef {
  submitPaymentMethod: () => void;
}

// Props for PaymentMethodSelection component
export interface PaymentMethodSelectionProps {
  onNext: (data: PaymentMethod) => void;
}

// Payment method display info
export interface PaymentMethodInfo {
  id: string;
  name: string;
  icon: string;
}
