import { AdminRentalDetailView } from "./rental-detail-view";

export default async function AdminRentalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminRentalDetailView rentalId={id} />;
}
