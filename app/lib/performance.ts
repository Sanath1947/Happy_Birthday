interface PerformanceMetric {
  type: string
  value: number
  timestamp: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private static instance: PerformanceMonitor

  private constructor() {
    this.initializeObservers()
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private initializeObservers() {
    if (typeof window !== 'undefined') {
      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach(entry => {
          this.recordMetric('FCP', entry.startTime)
        })
      }).observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach(entry => {
          this.recordMetric('LCP', entry.startTime)
        })
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach(entry => {
          this.recordMetric('FID', entry.duration)
        })
      }).observe({ entryTypes: ['first-input'] })
    }
  }

  private recordMetric(type: string, value: number) {
    const metric: PerformanceMetric = {
      type,
      value,
      timestamp: Date.now()
    }
    this.metrics.push(metric)
    this.persistMetric(metric)
  }

  private persistMetric(metric: PerformanceMetric) {
    try {
      const metrics = JSON.parse(localStorage.getItem('performance_metrics') || '[]')
      metrics.push(metric)
      localStorage.setItem('performance_metrics', JSON.stringify(metrics))
    } catch (error) {
      console.error('Failed to persist performance metric:', error)
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return this.metrics
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance() 