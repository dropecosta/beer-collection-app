export interface Beer {
    abv: number
    ibu: number
    ebc: number
    id: string
    name: string
    type: string
    year: number
    image: string
    notes: string
    createdAt?: string
    updatedAt?: string
    foodPairing?: string[]
    brewersTips?: string
    custom?: boolean
  }
  