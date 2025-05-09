import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import BeerCard from './BeerCard'
import { Beer } from '@/types/beer'
import '@testing-library/jest-dom'
import React from 'react'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props)
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => React.createElement('a', { href }, children)
}))


describe('BeerCard', () => {
  const mockBeer: Beer = {
    id: '123',
    name: 'Test Beer',
    type: 'Lager',
    notes: 'Some notes',
    abv: 4,
    ibu: 20,
    ebc: 15,
    image: '/test.jpg',
    year: 2020,
    custom: false,
  }

  it('renderiza informações da cerveja sem botão de remover quando não é custom', () => {
    render(<BeerCard beer={mockBeer} />)
    
    // Verifica se o nome está presente
    expect(screen.getByText('Test Beer')).toBeInTheDocument()
    
    // Verifica se os dados da cerveja estão presentes
    expect(screen.getByText('ABV: 4%')).toBeInTheDocument()
    expect(screen.getByText('IBU: 20')).toBeInTheDocument()
    expect(screen.getByText('EBC: 15')).toBeInTheDocument()
    
    // Verifica se não existe botão de remover
    expect(screen.queryByLabelText('Remover cerveja')).not.toBeInTheDocument()
  })

  it('mostra botão de remover e chama onRemove quando é uma cerveja custom', () => {
    // Mock da função de remoção
    const handleRemove = vi.fn()
    
    render(
      <BeerCard 
        beer={{ ...mockBeer, custom: true }} 
        onRemove={handleRemove} 
      />
    )
    
    // Verifica se o botão existe
    const removeButton = screen.getByLabelText('Remover cerveja')
    expect(removeButton).toBeInTheDocument()
    
    // Simula o clique e verifica se a função foi chamada com o ID correto
    fireEvent.click(removeButton)
    expect(handleRemove).toHaveBeenCalledWith('123')
  })
})