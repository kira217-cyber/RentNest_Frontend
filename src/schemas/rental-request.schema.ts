import { z } from "zod";

export const rentalRequestSchema = z
  .object({
    moveInDate: z.string().min(1, "Move-in date is required"),
    moveOutDate: z.string().optional(),
    message: z
      .string()
      .max(500, "Message must be under 500 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => new Date(data.moveInDate).getTime() > Date.now(), {
    message: "Move-in date must be in the future",
    path: ["moveInDate"],
  })
  .refine(
    (data) =>
      !data.moveOutDate ||
      new Date(data.moveOutDate).getTime() > new Date(data.moveInDate).getTime(),
    {
      message: "Move-out date must be after the move-in date",
      path: ["moveOutDate"],
    },
  );

export type RentalRequestFormValues = z.infer<typeof rentalRequestSchema>;
