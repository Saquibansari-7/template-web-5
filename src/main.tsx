/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContentProvider } from './admin/store.tsx'
import { AuthProvider } from './admin/auth.tsx'
import { AdminApp } from './admin/AdminApp.tsx'
import { ErrorBoundary } from './admin/ErrorBoundary.tsx'
import OpeningAnimation from './components/OpeningAnimation.tsx'
import { MusicProvider } from './components/MusicProvider.tsx'

const isAdmin = window.location.pathname.startsWith('/admin')

function PublicSite() {
  const [opened, setOpened] = useState(false)
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
