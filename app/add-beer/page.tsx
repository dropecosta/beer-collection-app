'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export default function AddBeerPage() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    year: '',
    notes: '',
    abv: '',
    ibu: '',
    ebc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
  }

  return (
    <Container className="py-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="type" className="text-sm font-medium">Type</label>
          <Input
            id="type"
            name="type"
            placeholder="Lager, Ale, Pilsen…"
            value={form.type}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="year" className="text-sm font-medium">Year</label>
          <Input
            id="year"
            name="year"
            type="number"
            placeholder="YYYY"
            value={form.year}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="notes" className="text-sm font-medium">Description</label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Write a description of the beer"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="abv" className="text-sm font-medium">ABV</label>
          <Input
            id="abv"
            name="abv"
            placeholder="Alcohol by Volume"
            value={form.abv}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="ibu" className="text-sm font-medium">IBU</label>
          <Input
            id="ibu"
            name="ibu"
            placeholder="International Bitterness Units"
            value={form.ibu}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="ebc" className="text-sm font-medium">EBC</label>
          <Input
            id="ebc"
            name="ebc"
            placeholder="European Brewery Convention"
            value={form.ebc}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-[200px] h-[50px] mt-[50px] mb-[40px] text-sm bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-black"
        >
          Add Beer
        </Button>
      </form>
    </Container>
  )
}