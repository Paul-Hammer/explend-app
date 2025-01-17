// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

import { IS_PROD } from './config/constants/main'

Sentry.init({
  dsn: 'https://ea71017b9fc55199468ca928a1744adc@o4507440201859072.ingest.de.sentry.io/4507440206118992',

  // Enable Sentry only in production mode
  enabled: IS_PROD,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
})
