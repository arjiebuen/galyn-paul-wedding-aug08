"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { RSVPFormSchema, toAPIData } from "@/lib/validation";

interface RSVPFormProps {
  onSuccess: () => void;
}

export default function RSVPForm({ onSuccess }: RSVPFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(RSVPFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      attending: "true" as "true" | "false",
      guests: 1,
      message: "",
    },
  });

  const attending = useWatch({ control, name: "attending" });

  const onSubmit = async (data: {
    fullName: string;
    email: string;
    attending: "true" | "false";
    guests: number;
    message?: string;
  }) => {
    try {
      const apiData = toAPIData(data);

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Submit error:", result?.error || "Unknown error");
        toast.error("Something went wrong. Please try again.");
        return;
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          {...register("fullName")}
          placeholder="Enter your full name"
          className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-gray-200 focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 outline-none transition-all"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email address"
          className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-gray-200 focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 outline-none transition-all"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Will you attend? */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Will you attend?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="true"
              defaultChecked
              {...register("attending")}
              className="accent-[#C8A96A]"
            />
            <span>Joyfully Accept</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="false"
              {...register("attending")}
              className="accent-[#C8A96A]"
            />
            <span>Regretfully Decline</span>
          </label>
        </div>
        {errors.attending && (
          <p className="text-red-500 text-sm mt-1">{errors.attending.message}</p>
        )}
      </div>

      {/* Guest Count */}
      {attending !== "false" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <input
            type="number"
            {...register("guests", { valueAsNumber: true })}
            min={1}
            max={10}
            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-gray-200 focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 outline-none transition-all"
          />
          {errors.guests && (
            <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
          )}
        </motion.div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message (Optional)
        </label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Write a heartfelt message for the couple..."
          className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-gray-200 focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 outline-none transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-[#C8A96A] text-white rounded-full font-semibold text-lg hover:bg-[#b8985e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Send size={18} />
            Submit RSVP
          </>
        )}
      </motion.button>
    </form>
  );
}
