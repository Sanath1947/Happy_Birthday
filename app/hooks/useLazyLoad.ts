import { useState, useEffect, useCallback } from 'react'

export function useLazyLoad(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    },
    []
  )

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(callback, {
      threshold,
    })

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, callback, threshold])

  return [setRef, isVisible] as const
} 