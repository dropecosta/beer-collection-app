import { getBeerById } from '@/lib/api'
import BeerDetail from '@/components/BeerDetail'

export default async function BeerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const beer = await getBeerById(params.id)
  return <BeerDetail beer={beer} />
}