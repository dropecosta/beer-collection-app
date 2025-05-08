'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Beer } from '@/types/beer'

const BeerCard: React.FC<{
  beer: Beer
  onRemove?: (id: string) => void
}> = ({ beer, onRemove }) => {
  const [imgSrc, setImgSrc] = useState<string>(beer.image)

  return (
    <Link href={`/beer/${beer.id}`} className="block">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-sm hover:shadow-md transition-transform overflow-hidden">
        {beer.custom && onRemove && (
          <button
            onClick={e => {
              e.preventDefault()
              onRemove(beer.id)
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
            aria-label="Remover cerveja"
          >
            ✕
          </button>
        )}
        <div className="w-full flex items-center justify-center bg-gray-100 p-4 mb-4">
          <Image
            src={imgSrc}
            alt={beer.name}
            width={200}
            height={200}
            className="object-contain"
            onError={() => setImgSrc('/fallback.webp')}
          />
        </div>
        <div className="p-4 text-center flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">{beer.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{beer.notes}</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            <span className="bg-gray-200 px-2 py-1 rounded-md">
              ABV: {beer.abv ?? '–'}%
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded-md">
              IBU: {beer.ibu ?? '–'}
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded-md">
              EBC: {beer.ebc ?? '–'}
            </span>
          </div>
          <p className="text-xs text-gray-600 uppercase font-semibold">{beer.type}</p>
        </div>
      </div>
    </Link>
  )
}

export default BeerCard