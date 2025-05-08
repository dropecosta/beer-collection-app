'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Star, StarHalf } from 'lucide-react'
import { Beer } from '@/types/beer'


const BeerCard: React.FC<{ beer: Beer }> = ({ beer }) => {
  const [imgSrc, setImgSrc] = useState<string>(beer.image)

    const renderStars = (rating: number) => {
      const stars = []
      const fullStars = Math.floor(rating)
      const hasHalf = rating % 1 !== 0
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />)
        } else if (i === fullStars && hasHalf) {
          stars.push(<StarHalf key={i} className="w-4 h-4 text-yellow-400" />)
        } else {
          stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
        }
      }
      return stars
    }
  
    return (
      <div className="w-full max-w-xs bg-white rounded-lg shadow-sm hover:shadow-md transition-transform overflow-hidden">
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
          <div className="flex items-center space-x-2 text-xs text-gray-500 justify-center gap-[10px]">
          <span>ABV: {beer.abv ?? '–'}%</span>
          <span>IBU: {beer.ibu ?? '–'}</span>
          <span>EBC: {beer.ebc ?? '–'}</span>
        </div>
          <p className="text-xs text-gray-600 text-bold uppercase font-semibold">
            {beer.type}
          </p>
          <div className="flex justify-center">{renderStars(beer.rating)}</div>
        </div>
      </div>
    )
  }

  export default BeerCard;