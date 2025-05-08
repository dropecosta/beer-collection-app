export interface Beer {
    abv: string
    ibu: string
    ebc: string
    id: string
    name: string
    type: string
    year: number
    image: string
    notes: string
    rating: number
    createdAt?: string
    updatedAt?: string
    foodPairing?: string[]
    brewersTips?: string
    [key: string]: any
  }
  