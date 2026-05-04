import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Switch } from 'wouter'

import Home from './home/index.jsx'
import Lab001 from './lab/001-sagarifuji/index.jsx'
import Lab002 from './lab/002-rainbow-swarm/index.jsx'
import Lab003 from './lab/003-stage/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lab/001-sagarifuji" component={Lab001} />
      <Route path="/lab/002-rainbow-swarm" component={Lab002} />
      <Route path="/lab/003-stage" component={Lab003} />
    </Switch>
  </StrictMode>,
)
