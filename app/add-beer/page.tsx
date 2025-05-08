'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Beer } from '@/types/beer'

export default function AddBeerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', type: '', year: '', notes: '',
    abv: '', ibu: '', ebc: ''
  })

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Date.now().toString()
    const newBeer: Beer = {
      id,
      name: form.name,
      type: form.type,
      year: parseInt(form.year) || new Date().getFullYear(),
      image: '/fallback.webp',
      notes: form.notes,
      abv: parseFloat(form.abv) || 0,
      ibu: parseFloat(form.ibu) || 0,
      ebc: parseFloat(form.ebc) || 0,
      custom: true
    }
    const raw = localStorage.getItem('customBeers') || '[]'
    const arr: Beer[] = JSON.parse(raw)
    arr.unshift(newBeer)
    localStorage.setItem('customBeers', JSON.stringify(arr))
    router.push('/')
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Adicionar Cerveja</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="name" required
          placeholder="Nome"
          value={form.name} onChange={handle}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="type" required
          placeholder="Tipo (tagline)"
          value={form.type} onChange={handle}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="year" required type="number"
          placeholder="Ano (YYYY)"
          value={form.year} onChange={handle}
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="notes" required rows={3}
          placeholder="Descrição"
          value={form.notes} onChange={handle}
          className="w-full px-3 py-2 border rounded"
        />
        <div className="grid grid-cols-3 gap-2">
          <input name="abv" placeholder="ABV" value={form.abv} onChange={handle}
            className="px-2 py-1 border rounded"
          />
          <input name="ibu" placeholder="IBU" value={form.ibu} onChange={handle}
            className="px-2 py-1 border rounded"
          />
          <input name="ebc" placeholder="EBC" value={form.ebc} onChange={handle}
            className="px-2 py-1 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Adicionar
        </button>
      </form>
    </div>
  )
}