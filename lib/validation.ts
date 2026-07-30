import { z } from "zod";

// Schema for form validation (attending as string from radio inputs)
export const RSVPFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer")
    .refine((val) => !/<[^>]*>/i.test(val), {
      message: "Name cannot contain HTML tags",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
  attending: z.enum(["true", "false"]),
  guests: z
    .number()
    .int("Guests must be a whole number")
    .min(1, "At least 1 guest")
    .max(10, "Maximum 10 guests"),
  message: z
    .string()
    .max(1000, "Message must be 1000 characters or fewer")
    .optional(),
});

// Type for the form data (before API submission)
export type RSVPFormData = z.infer<typeof RSVPFormSchema>;

// Data sent to API (attending as boolean)
export interface RSVPAPIData {
  fullName: string;
  email: string;
  attending: boolean;
  guests: number;
  message?: string;
}

export function toAPIData(formData: RSVPFormData): RSVPAPIData {
  return {
    fullName: formData.fullName,
    email: formData.email,
    attending: formData.attending === "true",
    guests: formData.guests,
    message: formData.message,
  };
}

