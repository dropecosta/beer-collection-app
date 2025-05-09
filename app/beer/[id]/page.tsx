import { getBeerById } from '@/lib/api'
import BeerDetail from '@/components/BeerDetail/BeerDetail'

export default async function BeerDetailPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { id } = params;
  const beer = await getBeerById(id);
  return <BeerDetail beer={beer} />;
}