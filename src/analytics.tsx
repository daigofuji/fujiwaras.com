import { useEffect } from 'react'
import { useLocation } from 'wouter'

declare const gtag: (...args: unknown[]) => void

export default function Analytics() {
  const [location] = useLocation()
  useEffect(() => {
    if (typeof gtag === 'undefined') return
    gtag('event', 'page_view', { page_path: location })
  }, [location])
  return null
}
