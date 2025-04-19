import { getAnalytics, logEvent } from 'firebase/analytics'
import { firebase } from '../firebase/config'

export class AnalyticsService {
  private static instance: AnalyticsService
  private analytics: any

  private constructor() {
    this.analytics = getAnalytics(firebase)
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  public trackEvent(eventName: string, params?: any) {
    logEvent(this.analytics, eventName, params)
  }
} 