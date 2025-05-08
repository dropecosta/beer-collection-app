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

  const [fetched, setFetched] = useState<Beer[]>([])
  const [custom, setCustom] = useState<Beer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/beers?page=${currentPage}`)
      .then(res => res.json())
      .then((data: Beer[]) => setFetched(data))
      .catch(() => setFetched([]))
      .finally(() => setLoading(false))
  }, [currentPage])

  useEffect(() => {
    const raw = localStorage.getItem('customBeers') || '[]'
    setCustom(JSON.parse(raw))
  }, [])

  const removeCustom = (id: string) => {
    const updated = custom.filter(b => b.id !== id)
    localStorage.setItem('customBeers', JSON.stringify(updated))
    setCustom(updated)
  }

  const beers = [...custom, ...fetched]

  return (
    <main className="min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-center py-20 text-gray-600">Carregando...</p>
      ) : (
        <>
          <BeerGridClient  
            beers={beers} 
            onRemoveCustom={removeCustom} 
          />
          <Pagination page={currentPage} />
        </>
      )}
    </main>
  )
}