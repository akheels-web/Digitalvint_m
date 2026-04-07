import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react"
import './index.css'
import App from './App.tsx'

// Initialize Sentry early so it captures all errors
Sentry.init({
  dsn: "https://1f5014b26c59dd653a9bb868f63e6b57@o4511179370528769.ingest.us.sentry.io/4511179371446272", // Paste your generated Sentry URL here
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
