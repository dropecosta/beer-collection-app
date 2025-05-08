import { Beer } from '@/types/beer'

const BASE = 'https://punkapi.online/v3'

export async function getBeers(
  page = 1,
  perPage = 30
): Promise<Beer[]> {
  const res = await fetch(
    `${BASE}/beers?page=${page}&per_page=${perPage}`
  )
  if (!res.ok) throw new Error('Erro ao buscar cervejas da Punk API')
  const data = await res.json()
  return data.map((b: any) => ({
    id: String(b.id),
    name: b.name,
    type: b.tagline,
    year: parseInt(b.first_brewed.split('-').pop() || '', 10) || 0,
    image:
      b.image_url ||
      `${BASE}/images/${String(b.id).padStart(3, '0')}.png`,
    notes: b.description,
    rating: b.abv ?? 0,
    abv: b.abv,
    ibu: b.ibu,
    ebc: b.ebc,
    foodPairing: b.food_pairing,
    brewersTips: b.brewers_tips,
  }))
}

export async function getBeerById(id: string): Promise<Beer> {
  const res = await fetch(`${BASE}/beers/${id}`)
  if (!res.ok) throw new Error('Erro ao buscar cerveja da Punk API')
  const [b] = await res.json()
  return {
    id: String(b.id),
    name: b.name,
    type: b.tagline,
    year: parseInt(b.first_brewed.split('-').pop() || '', 10) || 0,
    image:
      b.image_url ||
      `${BASE}/images/${String(b.id).padStart(3, '0')}.png`,
    notes: b.description,
    rating: b.abv ?? 0,
    abv: b.abv,
    ibu: b.ibu,
    ebc: b.ebc,
    foodPairing: b.food_pairing,
    brewersTips: b.brewers_tips,
  }
}

export async function createBeer(_: Omit<Beer, 'id'>): Promise<Beer> {
  throw new Error('Operação não suportada pela Punk API')
}