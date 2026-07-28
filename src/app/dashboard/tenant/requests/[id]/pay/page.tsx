import { PayView } from "./pay-view";

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PayView rentalId={id} />;
}
