/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContentProvider } from './admin/store.tsx'
import { AuthProvider } from './admin/auth.tsx'
import { AdminApp } from './admin/AdminApp.tsx'
import { ErrorBoundary } from './admin/ErrorBoundary.tsx'
import OpeningAnimation from './components/OpeningAnimation.tsx'
import { MusicProvider } from './components/MusicProvider.tsx'
import { resolveSite } from './lib/siteResolver'

const isAdmin = window.location.pathname.startsWith('/admin')

function PublicSite() {
  const [opened, setOpened] = useState(false)
  const [preflight, setPreflight] = useState<{ loading: boolean; notFound: boolean }>(() => {
    const params = new URLSearchParams(window.location.search)
    const customer = params.get('customer')
    if (!customer || !customer.trim()) {
      return { loading: false, notFound: false }
    }
    return { loading: true, notFound: false }
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const customer = params.get('customer')
    if (!customer || !customer.trim()) return

    resolveSite(customer.trim()).then((site) => {
      setPreflight({ loading: false, notFound: !site })
    }).catch(() => {
      setPreflight({ loading: false, notFound: true })
    })
  }, [])

  if (preflight.loading) {
    return null
  }

  if (preflight.notFound) {
    return (
      <div className="min-h-screen bg-wine flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-serif mb-4">404</h1>
          <p className="text-xl mb-2">Wedding site not found</p>
          <p className="text-white/70">The site you are looking for does not exist or is no longer available.</p>
        </div>
      </div>
    )
  }

  return (
    <MusicProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
      {!opened && <OpeningAnimation onOpen={() => setOpened(true)} />}
    </MusicProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? (
      <AuthProvider>
        <ContentProvider>
          <ErrorBoundary>
            <AdminApp />
          </ErrorBoundary>
        </ContentProvider>
      </AuthProvider>
    ) : (
      <PublicSite />
    )}
  </StrictMode>,
)
