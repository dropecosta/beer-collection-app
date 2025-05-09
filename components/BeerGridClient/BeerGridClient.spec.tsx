import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import BeerGridClient from './BeerGridClient'
import { Beer } from '@/types/beer'

// Mock para BeerGrid
vi.mock('../BeerGrid/BeerGrid', () => ({
  __esModule: true,
  default: ({ beers }: { beers: Beer[] }) => (
    <div data-testid="beer-grid-mock">
      {beers.map(beer => (
        <div key={beer.id} data-testid={`beer-item-${beer.id}`}>
          {beer.name}
        </div>
      ))}
    </div>
  )
}))

// Mock para ui/select
vi.mock('../ui/select', () => ({
  Select: ({ children, onValueChange }: any) => (
    <div data-testid="select-mock" onClick={() => onValueChange('abv')}>
      {children}
    </div>
  ),
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => (
    <div data-testid={`select-item-${value}`}>{children}</div>
  ),
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: () => <div>Ordenar por</div>,
}))

describe('BeerGridClient', () => {
  const mockBeers: Beer[] = [
    {
      id: '1',
      name: 'Beer A',
      type: 'IPA',
      abv: 5,
      ibu: 50,
      ebc: 20,
      notes: 'Notes',
      image: '/beer-a.jpg',
      year: 2022,
      custom: false,
    },
    {
      id: '2',
      name: 'Beer B',
      type: 'Stout',
      abv: 7.5,
      ibu: 30,
      ebc: 80,
      notes: 'Notes',
      image: '/beer-b.jpg',
      year: 2023,
      custom: true,
    },
  ]

  it('renderiza controles de ordenação e contagem de cervejas', () => {
    render(<BeerGridClient beers={mockBeers} />)

    // Verifica se o label e select estão presentes
    expect(screen.getByText('Order by:')).toBeInTheDocument()
    expect(screen.getByTestId('select-mock')).toBeInTheDocument()

    // Verifica se o botão de limpar está presente
    expect(screen.getByText('Clear filter')).toBeInTheDocument()

    // Verifica se a contagem está correta
    expect(screen.getByText('Beers per page:')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('ordena cervejas customizadas primeiro por padrão', () => {
    render(<BeerGridClient beers={mockBeers} />)

    const beerItems = screen.getAllByTestId(/beer-item-/)
    
    // Primeiro item deve ser Beer B (custom: true)
    expect(beerItems[0]).toHaveTextContent('Beer B')
    // Segundo item deve ser Beer A (custom: false)
    expect(beerItems[1]).toHaveTextContent('Beer A')
  })

  it('atualiza ordenação quando select é alterado', async () => {
    render(<BeerGridClient beers={mockBeers} />)

    // Simula clique no select (que no mock muda para 'abv')
    fireEvent.click(screen.getByTestId('select-mock'))

    // Deve ordenar por ABV (decrescente por padrão)
    const beerItemsAfter = screen.getAllByTestId(/beer-item-/)
    expect(beerItemsAfter[0]).toHaveTextContent('Beer B') // ABV 7.5
    expect(beerItemsAfter[1]).toHaveTextContent('Beer A') // ABV 5
  })

  it('limpa filtros quando botão clear é clicado', () => {
    render(<BeerGridClient beers={mockBeers} />)

    // Primeiro, simula alteração de ordenação
    fireEvent.click(screen.getByTestId('select-mock'))
    
    // Depois clica no botão limpar
    fireEvent.click(screen.getByText('Clear filter'))
    
    // Verifica se a ordenação voltou ao padrão
    const beerItems = screen.getAllByTestId(/beer-item-/)
    expect(beerItems[0]).toHaveTextContent('Beer B') // custom true primeiro
    expect(beerItems[1]).toHaveTextContent('Beer A')
  })
})