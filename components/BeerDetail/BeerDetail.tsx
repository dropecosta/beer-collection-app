'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Beer } from '@/types/beer'

export default function BeerDetail({ beer: serverBeer }: { beer: Beer }) {
  const { id } = useParams()
  const router = useRouter()
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
    <div className="mx-auto max-w-[1280px] p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md my-8 px-[40px]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex justify-center h-[300px]">
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
          <h1 className="text-[32px] mb-[4px] font-bold">{beer.name}</h1>
          <p className="text-sm text-gray-500 uppercase font-semibold  mb-[20px]">
            {beer.type}
          </p>
          <p className="text-gray-700  mb-[20px]">{beer.notes}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600  mb-[20px] gap-[18px]">
            <span>ABV: {beer.abv ?? '–'}%</span>
            <span>IBU: {beer.ibu  ?? '–'}</span>
            <span>EBC: {beer.ebc  ?? '–'}</span>
            {'ph' in beer && <span>pH: {(beer as any).ph}</span>}
            {'srm' in beer && <span>SRM: {(beer as any).srm}</span>}
            {'attenuation_level' in beer && (
              <span>
                Mitigation: {(beer as any).attenuation_level}%
              </span>
            )}
          </div>

          {beer.foodPairing && (
            <div>
              <h2 className="font-medium">Harmonizes with:</h2>
              <ul className="list-disc list-inside text-gray-600">
                {beer.foodPairing.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {beer.brewersTips && (
            <p className="text-sm text-gray-500 italic">
              Brewer's tip: {beer.brewersTips}
            </p>
          )}
        </div>
      </div>
      <div className="mt-[30px] flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <Button 
          className="w-[200px] h-[50px] mt-[50px] mb-[5px] text-sm bg-primary text-[#FFF] hover:opacity-90 dark:bg-primary dark:text-[#000]"
          onClick={() => router.back()}>
          Back
        </Button>
        {isCustom && (
          <Button 
            variant="destructive"
            className="w-[200px] h-[50px] mt-[10px] text-sm bg-[#b20e0e] text-[#FFF] hover:opacity-90 dark:bg-bg-[#b20e0e]"
            onClick={() => {
            const raw = localStorage.getItem('customBeers') || '[]'
            const arr: Beer[] = JSON.parse(raw)
            const filtered = arr.filter(b => b.id !== id)
            localStorage.setItem('customBeers', JSON.stringify(filtered))
            router.push('/')
          }}
          >
            Remove Item
          </Button>
        )}
      </div>
    </div>
  )
}