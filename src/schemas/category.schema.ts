import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().max(500, "Description must be under 500 characters").optional().or(z.literal("")),
  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
