'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NavButton() {
  const path = usePathname()
  const router = useRouter()
  const isAddBeer = path === '/add-beer'
  const isDetail = path.startsWith('/beer/')
  const [isCustom, setIsCustom] = useState(false)

  const handleRemove = () => {
    const id = path.split('/')[2]
    const raw = localStorage.getItem('customBeers') || '[]'
    const arr = JSON.parse(raw).filter((b: any) => b.id !== id)
    localStorage.setItem('customBeers', JSON.stringify(arr))
    router.push('/')
  }

  useEffect(() => {
        if (isDetail) {
          const id = path.split('/')[2]
          const raw = localStorage.getItem('customBeers') || '[]'
          const arr: any[] = JSON.parse(raw)
          setIsCustom(arr.some(b => b.id === id))
        } else {
          setIsCustom(false)
        }
  }, [isDetail, path])

  if (isDetail) {
    return (
      <div className="flex justify-center items-center space-x-4">
        {isCustom && (
          <Button
            variant="destructive"
            className="w-[200px] h-[30px] text-sm !text-[#FFF] hover:!text-[#FFF] mr-[10px]"
            onClick={handleRemove}
          >
            Remove item
          </Button>
        )}
        <Button
          variant="default"
          className="w-[200px] h-[30px] text-sm"
          onClick={() => router.push('/')}
        >
          Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <Link href={isAddBeer ? '/' : '/add-beer'}>
        <Button
          variant="default"
          className="w-[200px] h-[30px] text-sm !text-white border-gray-300 hover:bg-gray-100 hover:!text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {isAddBeer ? 'Back' : 'Add new Beer'}
        </Button>
      </Link>
    </div>
  )
}