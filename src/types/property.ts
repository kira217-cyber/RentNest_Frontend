import type { Category } from "./category";
import type { User } from "./user";

export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";

export type Property = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area?: number | null;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  isPublished: boolean;
  landlordId: string;
  categoryId: string;
  landlord?: Pick<User, "id" | "name" | "email" | "phone" | "photo">;
  category?: Category;
  createdAt: string;
  updatedAt: string;
};

export type CreatePropertyPayload = {
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  amenities: string[];
  images: string[];
  categoryId: string;
  status?: PropertyStatus;
  isPublished?: boolean;
};

export type UpdatePropertyPayload = Partial<CreatePropertyPayload>;

export type PropertyFilters = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  categoryId?: string;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
};
