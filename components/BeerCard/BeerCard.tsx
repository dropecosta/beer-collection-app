'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Beer } from '@/types/beer'

export default function BeerCard({ beer, onRemove }: { beer: Beer; onRemove?: (id: string) => void }) {
  const [imgSrc, setImgSrc] = useState(beer.image)

  return (
    <Link href={`/beer/${beer.id}`} className="block">
      <Card className='relative w-full h-full hover:shadow-lg transition-shadow duration-300'>
        {beer.custom && onRemove && (
          <button
            onClick={e => { e.preventDefault(); onRemove(beer.id) }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
            aria-label="Remover cerveja"
          >
            ✕
          </button>
        )}
        <CardHeader className="p-0">
          <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <Image
              src={imgSrc}
              alt={beer.name}
              width={200}
              height={300}
              className="object-contain h-[300px]"
              onError={() => setImgSrc('/fallback.webp')}
            />
          </div>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <CardTitle>{beer.name}</CardTitle>
        </CardContent>
        <CardFooter>
          <span className="text-xs text-gray-500 dark:text-gray-400">{`ABV: ${beer.abv ?? '–'}%`}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{`IBU: ${beer.ibu ?? '–'}`}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{`EBC: ${beer.ebc ?? '–'}`}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}