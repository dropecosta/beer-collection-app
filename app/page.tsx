'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BeerGridClient from '@/components/BeerGridClient'
import Pagination from '@/components/Pagination'
import { Beer } from '@/types/beer'

export default function HomePage() {
  const params = useSearchParams()
  const pageParam = params.get('page') ?? '1'
  const currentPage = parseInt(pageParam, 10)

  const [beers, setBeers] = useState<Beer[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/beers?page=${currentPage}`)
      .then(res => res.json())
      .then((data: Beer[]) => setBeers(data))
      .catch(() => setBeers([]))
      .finally(() => setLoading(false))
  }, [currentPage])

  return (
    <main className="min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-center py-20 text-gray-600">Carregando...</p>
      ) : (
        <>
          <BeerGridClient beers={beers} />
          <Pagination page={currentPage} />
        </>
      )}
    </main>
  )
}