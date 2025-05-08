'use client'

import React from 'react'
import { Beer } from '@/types/beer'
import BeerCard from './BeerCard'
import { Container } from './ui/container'
import { Grid } from './ui/grid'

export default function BeerGrid({ beers }: { beers: Beer[] }) {
    return (
      <Container className="py-12">
        <Grid>
          {beers.map(b => (
            <BeerCard key={b.id} beer={b} />
          ))}
        </Grid>
      </Container>
    )
  }