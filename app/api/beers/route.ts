import { NextRequest, NextResponse } from 'next/server'
import { getBeers } from '@/lib/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1', 10)

  try {
    const beers = await getBeers(page)
    return NextResponse.json(beers)
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao buscar cervejas' },
      { status: 500 }
    )
  }
}