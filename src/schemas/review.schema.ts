import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number({ message: "Select a rating" })
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment must be under 500 characters"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
