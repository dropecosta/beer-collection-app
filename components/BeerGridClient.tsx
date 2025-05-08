'use client'

import React, { useState, useMemo } from 'react'
import { Beer } from '@/types/beer'
import BeerGrid from './BeerGrid'

const sortOptions = [
  { label: 'Nome',   value: 'name' },
  { label: 'ABV',    value: 'abv' },
  { label: 'IBU',    value: 'ibu' },
  { label: 'EBC',    value: 'ebc' },
  { label: 'Ano',    value: 'year' },
  { label: 'Rating', value: 'rating' },
]

export default function BeerGridClient({ beers }: { beers: Beer[] }) {
  const [sortKey, setSortKey] = useState<string>('name')
  const [sortDir, setSortDir]   = useState<'asc'|'desc'>('desc')

  const sorted = useMemo<Beer[]>(() => {
    return [...beers].sort((a, b) => {
      const va = a[sortKey as keyof Beer]
      const vb = b[sortKey as keyof Beer]
      if (sortKey === 'name') {
        return sortDir === 'asc'
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va))
      }
      return (Number(vb) || 0) - (Number(va) || 0)
    })
  }, [beers, sortKey])

  return (
    <>
      <div className="mx-auto max-w-[1280px] w-full px-6 py-4 mb-8 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 mb-[10px]">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 pr-[8px]">Ordenar por:</label>
          <select
            id="sort"
            value={sortKey}
            onChange={e => {
                setSortKey(e.target.value)
                setSortDir('desc')
              }}
            className="px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 mr-[10px]"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={() => {
                setSortKey('name')
                setSortDir('asc')
              }}
            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition"
          >
            Limpar
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Total de cervejas: <span className="font-semibold">{sorted.length}</span>
        </div>
      </div>
      <BeerGrid beers={sorted} />
    </>
  )
}