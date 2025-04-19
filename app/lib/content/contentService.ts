import { Memory, LoveNote, Milestone, DreamDestination } from './types'

class ContentService {
  private static instance: ContentService
  private memories: Memory[] = []
  private loveNotes: LoveNote[] = []
  private milestones: Milestone[] = []
  private destinations: DreamDestination[] = []

  private constructor() {
    this.loadContent()
  }

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService()
    }
    return ContentService.instance
  }

  private loadContent() {
    try {
      this.memories = JSON.parse(localStorage.getItem('memories') || '[]')
      this.loveNotes = JSON.parse(localStorage.getItem('loveNotes') || '[]')
      this.milestones = JSON.parse(localStorage.getItem('milestones') || '[]')
      this.destinations = JSON.parse(localStorage.getItem('destinations') || '[]')
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  private saveContent() {
    try {
      localStorage.setItem('memories', JSON.stringify(this.memories))
      localStorage.setItem('loveNotes', JSON.stringify(this.loveNotes))
      localStorage.setItem('milestones', JSON.stringify(this.milestones))
      localStorage.setItem('destinations', JSON.stringify(this.destinations))
    } catch (error) {
      console.error('Failed to save content:', error)
    }
  }

  // Memory methods
  public addMemory(memory: Omit<Memory, 'id'>): Memory {
    const newMemory = { ...memory, id: Date.now().toString() }
    this.memories.push(newMemory)
    this.saveContent()
    return newMemory
  }

  public getMemories(): Memory[] {
    return this.memories
  }

  // Love Note methods
  public addLoveNote(note: Omit<LoveNote, 'id'>): LoveNote {
    const newNote = { ...note, id: Date.now().toString() }
    this.loveNotes.push(newNote)
    this.saveContent()
    return newNote
  }

  public getLoveNotes(): LoveNote[] {
    return this.loveNotes
  }

  // Milestone methods
  public addMilestone(milestone: Omit<Milestone, 'id'>): Milestone {
    const newMilestone = { ...milestone, id: Date.now().toString() }
    this.milestones.push(newMilestone)
    this.saveContent()
    return newMilestone
  }

  public getMilestones(): Milestone[] {
    return this.milestones
  }

  // Destination methods
  public addDestination(destination: Omit<DreamDestination, 'id'>): DreamDestination {
    const newDestination = { ...destination, id: Date.now().toString() }
    this.destinations.push(newDestination)
    this.saveContent()
    return newDestination
  }

  public getDestinations(): DreamDestination[] {
    return this.destinations
  }

  // Export/Import functionality
  public exportContent(): string {
    const content = {
      memories: this.memories,
      loveNotes: this.loveNotes,
      milestones: this.milestones,
      destinations: this.destinations,
      exportDate: new Date().toISOString()
    }
    return JSON.stringify(content)
  }

  public importContent(jsonContent: string): void {
    try {
      const content = JSON.parse(jsonContent)
      this.memories = content.memories || []
      this.loveNotes = content.loveNotes || []
      this.milestones = content.milestones || []
      this.destinations = content.destinations || []
      this.saveContent()
    } catch (error) {
      console.error('Failed to import content:', error)
    }
  }
} 