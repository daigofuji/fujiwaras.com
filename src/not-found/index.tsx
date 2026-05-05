import { Link, useLocation } from 'wouter'
import './not-found.css'

export default function NotFound() {
  const [location] = useLocation()
  return (
    <main className="not-found">
      <p className="not-found-numeral">404</p>
      <h1 className="not-found-heading">Page not found.</h1>
      <p className="not-found-path">Sorry. There's nothing at {location}</p>
      <Link href="/" className="not-found-link">Head back to the index →</Link>
    </main>
  )
}
