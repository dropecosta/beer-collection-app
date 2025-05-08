'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Beer } from '@/types/beer'

export default function BeerDetail({ beer: serverBeer }: { beer: Beer }) {
  const { id } = useParams()
  const [beer, setBeer] = useState<Beer>(serverBeer)
  const [isCustom, setIsCustom] = useState(false)
  const [imgSrc, setImgSrc] = useState(serverBeer.image)

  useEffect(() => {
    const raw = localStorage.getItem('customBeers') || '[]'
    const customs: Beer[] = JSON.parse(raw)
    const found = customs.find(b => b.id === id)
    if (found) {
      setBeer(found)
      setIsCustom(true)
      setImgSrc(found.image)
    }
  }, [id])

  return (
    <div className="mx-auto max-w-[1280px] p-8 bg-white rounded-lg shadow-md my-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex justify-center">
          <Image
            src={imgSrc}
            alt={beer.name}
            width={300}
            height={300}
            className="object-contain rounded"
            onError={() => setImgSrc('/fallback.webp')}
          />
        </div>

        <div className="md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold">{beer.name}</h1>
          <p className="text-sm text-gray-500 uppercase font-semibold">
            {beer.type}
          </p>
          <p className="text-gray-700">{beer.notes}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>ABV: {beer.abv ?? '–'}%</span>
            <span>IBU: {beer.ibu  ?? '–'}</span>
            <span>EBC: {beer.ebc  ?? '–'}</span>
            {'ph' in beer && <span>pH: {(beer as any).ph}</span>}
            {'srm' in beer && <span>SRM: {(beer as any).srm}</span>}
            {'attenuation_level' in beer && (
              <span>
                Atenuação: {(beer as any).attenuation_level}%
              </span>
            )}
          </div>

          {beer.foodPairing && (
            <div>
              <h2 className="font-medium">Harmoniza com:</h2>
              <ul className="list-disc list-inside text-gray-600">
                {beer.foodPairing.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {beer.brewersTips && (
            <p className="text-sm text-gray-500 italic">
              Dica do cervejeiro: {beer.brewersTips}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}