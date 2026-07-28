import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  location: z.string().min(2, "Location is required").max(150),
  price: z.number({ message: "Enter a valid price" }).positive("Price must be greater than 0"),
  bedrooms: z.number({ message: "Enter a valid number" }).int().min(0).max(20),
  bathrooms: z.number({ message: "Enter a valid number" }).int().min(0).max(20),
  area: z.number().positive("Area must be greater than 0").optional(),
  amenities: z.array(z.string()),
  images: z.array(z.url("Each image must be a valid URL")),
  categoryId: z.string().min(1, "Select a category"),
  status: z.enum(["AVAILABLE", "RENTED", "UNAVAILABLE"]),
  isPublished: z.boolean(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
