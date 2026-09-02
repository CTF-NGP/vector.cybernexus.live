import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LAUNCH_VIDEO = '/launch/launch.mp4'
const LAUNCH_POSTER = '/launch/launch.webp'

export default function LaunchPage() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const startedRef = useRef(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [muted, setMuted] = useState(false)

  const startPlayback = () => {
    if (startedRef.current || !videoRef.current) return

    startedRef.current = true
    setHasStarted(true)
    videoRef.current.muted = false
    videoRef.current.volume = 1
    videoRef.current.play().catch(() => {
      startedRef.current = false
      setHasStarted(false)
    })
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  useEffect(() => {
    const startOnIntent = (event) => {
      if (event.type === 'keydown' && !['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Enter'].includes(event.key)) return
      startPlayback()
    }

    window.addEventListener('wheel', startOnIntent, { passive: true, once: true })
    window.addEventListener('touchmove', startOnIntent, { passive: true, once: true })
    window.addEventListener('keydown', startOnIntent, { once: true })

    return () => {
      window.removeEventListener('wheel', startOnIntent)
      window.removeEventListener('touchmove', startOnIntent)
      window.removeEventListener('keydown', startOnIntent)
    }
  }, [])

  return (
    <main className="launch-page" aria-label="Launch video">
      <video
        ref={videoRef}
        className="launch-video"
        poster={LAUNCH_POSTER}
        playsInline
        preload="auto"
        onEnded={() => navigate('/', { replace: true })}
        onError={() => setHasError(true)}
      >
        <source src={LAUNCH_VIDEO} type="video/mp4" />
      </video>
      <div className="launch-overlay" aria-hidden="true" />
      {hasStarted && (
        <button
          className="launch-audio-toggle"
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      )}
      <div className="launch-status">
        {hasError ? 'Launch video unavailable' : hasStarted ? 'Launch in progress' : 'Scroll to begin'}
      </div>
    </main>
  )
}
