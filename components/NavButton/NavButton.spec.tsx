import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import NavButton from './NavButton'

// Mock do next/navigation
const mockRouter = {
  push: vi.fn(),
}

const mockPathname = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname(),
}))

// Mock do next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}))

// Mock do localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key]),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('NavButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  it('renderiza botão "Add new Beer" na página inicial', () => {
    mockPathname.mockReturnValue('/')
    
    render(<NavButton />)
    
    expect(screen.getByRole('button')).toHaveTextContent('Add new Beer')
    expect(screen.getByTestId('link')).toHaveAttribute('href', '/add-beer')
  })

  it('renderiza botão "Back" na página /add-beer', () => {
    mockPathname.mockReturnValue('/add-beer')
    
    render(<NavButton />)
    
    expect(screen.getByRole('button')).toHaveTextContent('Back')
    expect(screen.getByTestId('link')).toHaveAttribute('href', '/')
  })

  it('renderiza apenas botão "Back" na página de detalhes para cerveja não custom', () => {
    mockPathname.mockReturnValue('/beer/123')
    localStorageMock.getItem.mockReturnValue('[]')
    
    render(<NavButton />)
    
    // Apenas o botão Back deve estar presente
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent('Back')
    
    // Não deve haver botão de remover
    expect(screen.queryByText('Remove item')).not.toBeInTheDocument()
  })

  it('renderiza botões "Remove item" e "Back" para cerveja custom', async () => {
    mockPathname.mockReturnValue('/beer/custom-123')
    localStorageMock.getItem.mockReturnValue(JSON.stringify([{ id: 'custom-123' }]))
    
    render(<NavButton />)
    
    // Deve ter dois botões
    const buttons = await screen.findAllByRole('button')
    expect(buttons).toHaveLength(2)
    
    // Verifica conteúdo dos botões
    expect(buttons[0]).toHaveTextContent('Remove item')
    expect(buttons[1]).toHaveTextContent('Back')
  })

  it('remove cerveja do localStorage e navega ao clicar em "Remove item"', async () => {
    mockPathname.mockReturnValue('/beer/custom-123')
    localStorageMock.getItem.mockReturnValue(JSON.stringify([
      { id: 'custom-123', name: 'Custom Beer' }
    ]))
    
    render(<NavButton />)
    
    // Clica no botão de remover
    const removeButton = await screen.findByText('Remove item')
    fireEvent.click(removeButton)
    
    // Verifica se localStorage foi atualizado
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'customBeers',
      '[]'
    )
    
    // Verifica se redirecionou para home
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  it('navega para home ao clicar em "Back" na página de detalhes', () => {
    mockPathname.mockReturnValue('/beer/123')
    localStorageMock.getItem.mockReturnValue('[]')
    
    render(<NavButton />)
    
    fireEvent.click(screen.getByText('Back'))
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })
})