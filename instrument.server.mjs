import * as Sentry from '@sentry/tanstackstart-react'

const tracesSampleRate =
  Number(process.env.VITE_SENTRY_TRACES_SAMPLE_RATE) || 0.1
const replaysSessionSampleRate =
  Number(process.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE) || 0.0
const replaysOnErrorSampleRate =
  Number(process.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE) || 1.0

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_SENTRY_ENVIRONMENT,
  serverName: process.env.VITE_SENTRY_SERVICE_NAME,
  // Only send PII when explicitly enabled via env
  sendDefaultPii: process.env.VITE_SENTRY_SEND_DEFAULT_PII === 'true',
  tracesSampleRate,
  replaysSessionSampleRate,
  replaysOnErrorSampleRate,
})
