'use client'

import React, { useState, useMemo } from 'react'
import { Beer } from '@/types/beer'
import BeerGrid from './BeerGrid'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'


const sortOptions = [
  { label: 'Nome',   value: 'name' },
  { label: 'ABV',    value: 'abv' },
  { label: 'IBU',    value: 'ibu' },
  { label: 'EBC',    value: 'ebc' },
  { label: 'Ano',    value: 'year' },
]

export default function BeerGridClient({ beers, onRemoveCustom, }: { beers: Beer[]; onRemoveCustom?: (id: string) => void }) {
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
      <div className="mx-auto max-w-[1280px] w-full px-[40px] py-[30px] bg-white rounded-lg shadow-sm flex md:flex-col sm:flex-col items-center justify-between gap-4 ">
        <div className="flex space-x-2 w-full items-center sm:justify-start">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 pr-[8px]">Ordenar por:</label>
          <Select
            value={sortKey}
            onValueChange={(value: string) => {
              setSortKey(value)
              setSortDir('desc')
            }}
          >
            <SelectTrigger id="sort" className="w-[100px] mr-[10px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="w-[210px]">
              {sortOptions.map(o => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
                setSortKey('name')
                setSortDir('asc')
              }}
            variant="default"
            className="w-[100px] h-[30px] text-sm font-medium white border-gray-300 hover:bg-gray cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Limpar
          </Button>
        </div>

        

        <div className="text-sm text-gray-600 flex w-full justify-end gap-[10px]">
          Cervejas por página: 
          <span className="bg-[#e2e2e2] border-[1px] border-[#CCC] text-gray-800 text-xs font-medium me-2 px-[8px] py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">{sorted.length}</span>
        </div>
      </div>
      <BeerGrid beers={sorted} />
    </>
  )
}