import { AdminPropertyDetailView } from "./property-detail-view";

export default async function AdminPropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminPropertyDetailView propertyId={id} />;
}
