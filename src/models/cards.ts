export interface Card {
  cardId: string
  type: 'flashCard' | 'basic'
  front: string
  back?: string
  updated_at: string
  image?: boolean
}
