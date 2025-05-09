import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BeerGrid from './BeerGrid'
import { Beer } from '@/types/beer'

// Mock para o BeerCard - usando caminho absoluto
vi.mock('@/components/BeerCard/BeerCard', () => ({
  __esModule: true,
  default: ({ beer }: { beer: Beer }) => (
    <div data-testid={`beer-card-${beer.id}`}>
      {beer.name}
    </div>
  )
}))

// Mock para o BeerCard - usando caminho absoluto
vi.mock('@/components/BeerCard/BeerCard', () => ({
  __esModule: true,
  default: ({ beer }: { beer: Beer }) => (
    <div data-testid={`beer-card-${beer.id}`}>
      {beer.name}
    </div>
  )
}))

describe('BeerGrid', () => {
  it('renderiza uma grid vazia quando não há cervejas', () => {
    const { container } = render(<BeerGrid beers={[]} />)
    
    // Usando container.querySelector diretamente em vez de getByLabelText
    const gridContainer = container.querySelector('.py-12')
    const grid = container.querySelector('[class*="grid"]')
    
    expect(gridContainer).toBeInTheDocument()
    expect(grid).toBeInTheDocument()
    expect(grid?.childElementCount).toBe(0)
  })

  it('renderiza um BeerCard para cada cerveja na lista', () => {
    const mockBeers: Beer[] = [
      {
        id: '1',
        name: 'IPA',
        type: 'Ale',
        notes: 'Notes 1',
        abv: 5.5,
        ibu: 45,
        ebc: 20,
        image: '/ipa.jpg',
        custom: false,
        year: 2022
      },
      {
        id: '2',
        name: 'Stout',
        type: 'Stout',
        notes: 'Notes 2',
        abv: 7.0,
        ibu: 35,
        ebc: 80,
        image: '/stout.jpg',
        custom: true,
        year: 2021
      },
      {
        id: '3',
        name: 'Lager',
        type: 'Lager',
        notes: 'Notes 3',
        abv: 4.5,
        ibu: 20,
        ebc: 10,
        image: '/lager.jpg',
        custom: false,
        year: 2023
      }
    ]
    
    const { container } = render(<BeerGrid beers={mockBeers} />)
    
    // Usando container.querySelector diretamente em vez de getByLabelText
    const gridContainer = container.querySelector('.py-12')
    const grid = container.querySelector('[class*="grid"]')
    
    expect(gridContainer).toBeInTheDocument()
    expect(grid).toBeInTheDocument()
    
    // Verificar se temos 3 cards renderizados
    expect(grid?.childElementCount).toBe(3)
    
    // Verificar se cada cerveja foi passada para um BeerCard
    mockBeers.forEach(beer => {
      const card = screen.getByTestId(`beer-card-${beer.id}`)
      expect(card).toBeInTheDocument()
      expect(card).toHaveTextContent(beer.name)
    })
    
    // Verificar se os nomes estão presentes na ordem correta
    const cards = screen.getAllByText(/IPA|Stout|Lager/)
    expect(cards[0]).toHaveTextContent('IPA')
    expect(cards[1]).toHaveTextContent('Stout')
    expect(cards[2]).toHaveTextContent('Lager')
  })

  it('renderiza apenas um BeerCard quando há apenas uma cerveja', () => {
    const singleBeer: Beer = {
      id: '1',
      name: 'IPA',
      type: 'Ale',
      notes: 'Notes 1',
      abv: 5.5,
      ibu: 45,
      ebc: 20,
      image: '/ipa.jpg',
      custom: false,
      year: 2022
    }
    
    const { container } = render(<BeerGrid beers={[singleBeer]} />)
    
    const grid = container.querySelector('[class*="grid"]')
    
    expect(grid?.childElementCount).toBe(1)
    expect(screen.getByTestId('beer-card-1')).toBeInTheDocument()
  })

  it('mantém a ordem correta de renderização das cervejas', () => {
    const mockBeers: Beer[] = [
      { id: '5', name: 'Pilsner', type: 'Lager', notes: '', abv: 4.8, ibu: 25, ebc: 5, image: '/pilsner.jpg', custom: false, year: 2023 },
      { id: '8', name: 'Porter', type: 'Porter', notes: '', abv: 6.0, ibu: 30, ebc: 60, image: '/porter.jpg', custom: false, year: 2022 },
      { id: '2', name: 'Weiss', type: 'Wheat', notes: '', abv: 5.0, ibu: 15, ebc: 8, image: '/weiss.jpg', custom: false, year: 2021 }
    ]
    
    render(<BeerGrid beers={mockBeers} />)
    
    const cards = screen.getAllByText(/Pilsner|Porter|Weiss/)
    expect(cards[0]).toHaveTextContent('Pilsner')
    expect(cards[1]).toHaveTextContent('Porter')
    expect(cards[2]).toHaveTextContent('Weiss')
  })

  it('renderiza cervejas com diferentes propriedades corretamente', () => {
    const mixedBeers: Beer[] = [
      { id: '1', name: 'IPA', type: 'IPA', notes: 'Hoppy', abv: 6.5, ibu: 60, ebc: 15, image: '/ipa.jpg', custom: true, year: 2023 },
      { id: '2', name: 'Stout', type: 'Stout', notes: '', abv: 7.5, ibu: 30, ebc: 80, image: '', custom: false, year: 2020 }
    ]
    
    render(<BeerGrid beers={mixedBeers} />)
    
    expect(screen.getByTestId('beer-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('beer-card-2')).toBeInTheDocument()
    expect(screen.getByText('IPA')).toBeInTheDocument()
    expect(screen.getByText('Stout')).toBeInTheDocument()
  })
  
  it('renderiza corretamente com uma lista vazia', () => {
    const { container } = render(<BeerGrid beers={[]} />)
    
    const grid = container.querySelector('[class*="grid"]')
    expect(grid).toBeInTheDocument()
    expect(grid?.children.length).toBe(0)
  })
})