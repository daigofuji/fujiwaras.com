import { Link } from 'wouter'
import { experiments } from '../lab/index.js'
import './home.css'

export default function Home() {
  return (
    <main className="home">
      <header>
        <h1 className="home-name">Daigo Fujiwara-Smith</h1>
        <p className="home-tagline">
          World-class newsroom developer, visual computational artist. Lifetime learner.
        </p>
      </header>

      <section className="lab-section">
        <p className="lab-label">Playground</p>
        <ol className="lab-list">
          {experiments.map((exp) => (
            <li key={exp.slug} className="lab-item">
              <Link href={`/lab/${exp.slug}`} className="lab-link">
                <div className="lab-row">
                  <span className="lab-num">{exp.slug.split('-')[0]}</span>
                  <span className="lab-title">{exp.title}</span>
                  <span className="lab-date">{exp.date}</span>
                </div>
                <p className="lab-description">{exp.description}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
