import React from 'react'
import { Beer } from '@/types/beer'
import BeerCard from './BeerCard'

const BeerGrid: React.FC<{ beers: Beer[] }> = ({ beers }) => {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12 margin-lr-[30px]">
      <div className="grid gap-x-20 gap-[80px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {beers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  )
}

export default BeerGrid