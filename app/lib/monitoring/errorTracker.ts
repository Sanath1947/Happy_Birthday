import * as Sentry from '@sentry/nextjs'

export class ErrorTracker {
  public static captureError(error: Error, context?: any) {
    Sentry.captureException(error, {
      extra: context
    })
  }

  public static setUser(userId: string) {
    Sentry.setUser({ id: userId })
  }
} 