import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Switch, useLocation } from 'wouter'

import Home from './home/index'
import Lab001 from './lab/001-sagarifuji/index'
import Lab002 from './lab/002-rainbow-swarm/index'
import Lab003 from './lab/003-stage/index'
import NotFound from './not-found/index'

declare const gtag: (...args: unknown[]) => void

function Analytics() {
  const [location] = useLocation()
  useEffect(() => {
    if (typeof gtag === 'undefined') return
    gtag('event', 'page_view', { page_path: location })
  }, [location])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lab/001-sagarifuji" component={Lab001} />
      <Route path="/lab/002-rainbow-swarm" component={Lab002} />
      <Route path="/lab/003-stage" component={Lab003} />
      <Route component={NotFound} />
    </Switch>
  </StrictMode>,
)
