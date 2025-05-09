import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import BeerDetail from './BeerDetail'
import { Beer } from '@/types/beer'

// Mock Next.js hooks e componentes
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'test-id' }),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('BeerDetail', () => {
  const defaultBeer: Beer = {
    id: 'beer-1',
    name: 'Buzz',
    type: 'IPA',
    notes: 'A light, crisp and bitter IPA',
    year: 2007,
    image: '/beer.jpg',
    abv: 4.5,
    ibu: 60,
    ebc: 20,
    custom: false,
    foodPairing: ['Spicy chicken', 'Pizza', 'Steak'],
    brewersTips: 'Use fresh hops',
  }

  afterEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renderiza detalhes básicos da cerveja', () => {
    render(<BeerDetail beer={defaultBeer} />)

    expect(screen.getByText('Buzz')).toBeInTheDocument()
    expect(screen.getByText('IPA')).toBeInTheDocument()
    expect(screen.getByText('A light, crisp and bitter IPA')).toBeInTheDocument()
    expect(screen.getByText('ABV: 4.5%')).toBeInTheDocument()
    expect(screen.getByText('IBU: 60')).toBeInTheDocument()
    expect(screen.getByText('EBC: 20')).toBeInTheDocument()
  })

  it('renderiza harmonização e dicas do cervejeiro', () => {
    render(<BeerDetail beer={defaultBeer} />)

    expect(screen.getByText('Harmonizes with:')).toBeInTheDocument()
    expect(screen.getByText('Spicy chicken')).toBeInTheDocument()
    expect(screen.getByText('Pizza')).toBeInTheDocument()
    expect(screen.getByText('Steak')).toBeInTheDocument()
    expect(screen.getByText("Brewer's tip: Use fresh hops")).toBeInTheDocument()
  })

  it('carrega cerveja customizada do localStorage', () => {
    const customBeer: Beer = {
      ...defaultBeer,
      id: 'test-id',
      name: 'Custom Beer',
      custom: true,
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify([customBeer]))
    
    render(<BeerDetail beer={defaultBeer} />)
    
    // Deve renderizar a cerveja customizada do localStorage em vez da prop
    expect(screen.getByText('Custom Beer')).toBeInTheDocument()
  })

  it('usa imagem de fallback quando a imagem falha', async () => {
    localStorageMock.getItem.mockReturnValue('[]')
    render(<BeerDetail beer={defaultBeer} />)
    
    const img = screen.getByAltText(defaultBeer.name) as HTMLImageElement
    expect(img).toHaveAttribute('src', '/beer.jpg')
    
    // Usar fireEvent para simular o erro
    fireEvent.error(img)
    
    // Aguardar a atualização do estado após o erro
    await waitFor(() => {
      expect(screen.getByAltText(defaultBeer.name)).toHaveAttribute('src', '/fallback.webp')
    })
  })
})