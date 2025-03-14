import { z } from "zod";

// Base payment method schema
export const PaymentMethodTypeSchema = z.enum([
  "CARD",
  "BANK_TRANSFER",
  "MOBILE_MONEY",
]);

// Card payment schema
export const CardPaymentSchema = z.object({
  type: z.literal("CARD"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardholderName: z.string().min(3, "Cardholder name is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

// Bank transfer schema
export const BankTransferSchema = z.object({
  type: z.literal("BANK_TRANSFER"),
  accountNumber: z.string().min(8, "Valid account number is required"),
  bankName: z.string().min(2, "Bank name is required"),
  accountHolderName: z.string().min(3, "Account holder name is required"),
  routingNumber: z.string().optional(),
});

// Mobile money schema
export const MobileMoneySchema = z.object({
  type: z.literal("MOBILE_MONEY"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Valid phone number is required"),
  provider: z.string().min(2, "Provider name is required"),
});

// Combined payment method schema using discriminated union
export const PaymentMethodSchema = z.discriminatedUnion("type", [
  CardPaymentSchema,
  BankTransferSchema,
  MobileMoneySchema,
]);

// Infer TypeScript types from Zod schemas
export type PaymentMethodType = z.infer<typeof PaymentMethodTypeSchema>;
export type CardPayment = z.infer<typeof CardPaymentSchema>;
export type BankTransfer = z.infer<typeof BankTransferSchema>;
export type MobileMoney = z.infer<typeof MobileMoneySchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// Payment method list item from API
export interface PaymentMethodListItem {
  id: string;
  name: string;
  icon: string;
}

// API responses
export interface GetPaymentMethodsResponse {
  paymentMethods: PaymentMethodListItem[];
}

export interface SubmitPaymentMethodResponse {
  success: boolean;
  message: string;
}
