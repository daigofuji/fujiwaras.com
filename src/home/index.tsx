import { Link } from 'wouter'
import { toc, type TocEntry } from '../lab/toc'
import './home.css'

function ExperimentEntry({ exp }: { exp: TocEntry }) {
  const num = exp.slug ? exp.slug.split('-')[0] : '—'
  const inner = (
    <>
      <div className="lab-row">
        <span className="lab-num">{num}</span>
        <span className="lab-title">{exp.title}</span>
        <span className="lab-date">{exp.date}</span>
      </div>
      <p className="lab-description">{exp.description}</p>
    </>
  )
  if (exp.slug) return <Link href={`/lab/${exp.slug}`} className="lab-link">{inner}</Link>
  if (exp.url) return <a href={exp.url} className="lab-link" target="_blank" rel="noopener noreferrer">{inner}</a>
  return <div className="lab-link lab-link--inert">{inner}</div>
}

export default function Home() {
  return (
    <main className="home">
      <header>
        <h1 className="home-name">Daigo Fujiwara-Smith</h1>
        <p className="home-tagline">
          Lifetime learner to be a world-class newsroom developer, visual computational artist. This is the place I learn in public, share experiments, and document my journey.
        </p>
      </header>

      <section className="lab-section">
        <p className="lab-label">Playground</p>
        <p className="lab-chatter">My digital sketches and interactive proof of concepts.</p>
        <div className="lab-links">
          <a href="https://github.com/daigofuji" target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
          <a href="https://instagram.com/daigofuji" target="_blank" rel="noopener noreferrer">Instagram</a> |{' '}
          <a href="https://www.linkedin.com/in/daigo/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |{' '}
          <a href="https://bsky.app/profile/daigofuji.bsky.social" target="_blank" rel="noopener noreferrer">BlueSky</a>
        </div>
        <ol className="lab-list">
          {toc.map((exp) => (
            <li key={exp.slug ?? exp.url ?? exp.title} className="lab-item">
              <ExperimentEntry exp={exp} />
            </li>
          ))}
        </ol>
      </section>

      <footer className="home-footer">
        <p>
          Made by Daigo Fujiwara-Smith in Portland, Maine with love.{' '}
          <a href="https://github.com/daigofuji" target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
          <a href="https://www.linkedin.com/in/daigo/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
          {' '}
          <a href="https://bsky.app/profile/daigofuji.bsky.social" target="_blank" rel="noopener noreferrer">BlueSky</a> |
          {' '}
          <a href="mailto:daigo@daigofujiwara.com">Email</a>
        </p>
      </footer>
    </main>
  )
}
