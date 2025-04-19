type EventType = 'easter_egg_found' | 'memory_created' | 'page_view' | 'interaction'

interface AnalyticsEvent {
  type: EventType
  data: Record<string, any>
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private static instance: Analytics

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  public trackEvent(type: EventType, data: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: Date.now()
    }

    this.events.push(event)
    this.persistEvent(event)
    
    // You can implement real analytics service integration here
    console.log('Analytics event:', event)
  }

  private persistEvent(event: AnalyticsEvent) {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]')
      events.push(event)
      localStorage.setItem('analytics_events', JSON.stringify(events))
    } catch (error) {
      console.error('Failed to persist analytics event:', error)
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return this.events
  }
}

export const analytics = Analytics.getInstance() 