import * as z from "zod"

export const checkoutSchemaValidation = z.object({
  method: z.enum(["online", "cash"], {
    required_error: "Please select a Payment method.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  shippingAddress: z.string().min(1, {
    message: "Please enter a address.",
  }),
  note: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})
