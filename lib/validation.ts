import { z } from "zod";

// Schema for form validation (attending as string from radio inputs)
export const RSVPFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  attending: z.enum(["true", "false"]),
  guests: z.number().min(1, "At least 1 guest").max(10, "Maximum 10 guests"),
  message: z.string().optional(),
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

