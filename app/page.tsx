'use client'

import React, { Suspense } from 'react'
import HomeClient from '@/components/HomeClient/HomeClient'

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>}>
      <HomeClient />
    </Suspense>
  )
}