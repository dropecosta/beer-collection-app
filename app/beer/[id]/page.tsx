import { getBeerById } from '@/lib/api'
import BeerDetail from '@/components/BeerDetail/BeerDetail'

export default async function BeerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params;
  const beer = await getBeerById(id);
  return <BeerDetail beer={beer} />;
}