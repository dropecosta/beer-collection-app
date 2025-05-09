'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Beer } from '@/types/beer'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export default function AddBeerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    type: '',
    year: '',
    notes: '',
    abv: '',
    ibu: '',
    ebc: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      custom: true,
    }
    const raw = localStorage.getItem('customBeers') || '[]'
    const arr: Beer[] = JSON.parse(raw)
    arr.unshift(newBeer)
    localStorage.setItem('customBeers', JSON.stringify(arr))
    router.push('/')
  }

  return (
    <Container className="py-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="type">
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Lager, Ale, Pilsen…"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="year">
          <FormItem>
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="YYYY"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="notes">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Write a description of the beer"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="abv">
          <FormItem>
            <FormLabel>ABV</FormLabel>
            <FormControl>
              <Input
                name="abv"
                value={form.abv}
                onChange={handleChange}
                placeholder="Alcohol by Volume"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="ibu">
          <FormItem>
            <FormLabel>IBU</FormLabel>
            <FormControl>
              <Input
                name="ibu"
                value={form.ibu}
                onChange={handleChange}
                placeholder="International Bitterness Units"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="ebc">
          <FormItem>
            <FormLabel>EBC</FormLabel>
            <FormControl>
              <Input
                name="ebc"
                value={form.ebc}
                onChange={handleChange}
                placeholder="European Brewery Convention"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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