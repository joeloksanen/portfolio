import './App.css';
import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useSearchParams
} from 'react-router-dom'

const LandingTitle = () => {
  const pieces = ['a coder', 'a creative', 'a designer', 'a scientist']
  const [piece, setPiece] = useState(pieces[0])
  const [animationIterations, setAnimationIterations] = useState(0)
  const [animationTimeout, setAnimationTimeout] = useState(10)

  useEffect(() => {
    if (animationTimeout < 1000) {
      // Animate again
      setTimeout(() => {
        // Change to next title
        const idx = pieces.indexOf(piece) + 1
        const newPiece = idx < pieces.length ? pieces[idx] : pieces[0]
        setPiece(newPiece)
        // Update animation
        setAnimationTimeout(animationIterations < 50 ? animationTimeout : animationTimeout ** 1.04)
        setAnimationIterations(animationIterations + 1)
      }, animationTimeout)
    } else {
      // End animation
      setPiece('Joel')
    }
  }, [piece])

  return (
    <div>
      <h1>Hello, I am</h1>
      <h1 style={{color: 'yellow'}}>{piece}</h1>
    </div>
  )
}

const Landing = ({goToActivities}) => {
  return (
    <div className={`fullPage fadeIn`}>
      <div>
        <LandingTitle />
      </div>
    </div>
  )
}

const LoadingView = ({showLoading}) => {
  return (
    <div className='fullPage'>
      {showLoading ? <p>Loading...</p> : <></>}
    </div>
  )
}

const Home = () => {
  const [loaded, setLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    // Show landing page only after fonts have loaded, and soonest after 0.2s
    const start = new Date()
    document.fonts.ready.then(() => {
      const elapsed = ((new Date()) - start)
      setTimeout(() => {
        setLoaded(true)
      }, Math.max(300 - elapsed, 0))
    });

    setTimeout(() => {
      // If loaded for more than 0.5s, show Loading title
      setShowLoading(true)
    }, 500)
  }, []);

  if (loaded) {
    return (
      <div>
        <Landing />
      </div>
    )
  } else {
    return (
      <div>
        <LoadingView showLoading={showLoading} />
      </div>
    )
  }
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
