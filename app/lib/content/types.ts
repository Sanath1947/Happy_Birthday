export interface Memory {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  tags: string[]
}

export interface LoveNote {
  id: string
  content: string
  date: string
  mood: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  location?: string
}

export interface DreamDestination {
  id: string
  name: string
  description: string
  imageUrl: string
  notes: string[]
  status: 'planned' | 'visited' | 'dreaming'
} 