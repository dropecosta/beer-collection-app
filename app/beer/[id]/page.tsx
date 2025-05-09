// @ts-nocheck
import { getBeerById } from '@/lib/api'
import BeerDetail from '@/components/BeerDetail/BeerDetail'

export default async function BeerDetailPage(props: any) {
  const beer = await getBeerById(props.params.id)
  return <BeerDetail beer={beer} />
}