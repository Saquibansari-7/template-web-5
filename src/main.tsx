import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContentProvider } from './admin/store.tsx'
import { AuthProvider } from './admin/auth.tsx'
import { AdminApp } from './admin/AdminApp.tsx'
import { ErrorBoundary } from './admin/ErrorBoundary.tsx'

const isAdmin = window.location.pathname.startsWith('/admin')

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
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </StrictMode>,
)
