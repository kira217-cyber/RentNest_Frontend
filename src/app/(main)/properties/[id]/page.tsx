import { PropertyDetailsView } from "./property-details-view";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailsView propertyId={id} />;
}
