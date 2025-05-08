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
    <main className="min-h-screen p-4 bg-[#f4f4f4]">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
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