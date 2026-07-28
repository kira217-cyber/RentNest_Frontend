export type Review = {
  id: string;
  rating: number;
  comment: string;
  tenantId: string;
  propertyId: string;
  tenant?: {
    id: string;
    name: string;
    photo?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateReviewPayload = {
  propertyId: string;
  rating: number;
  comment: string;
};
