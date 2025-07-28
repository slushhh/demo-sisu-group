import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

// Reset styles added by browser
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/assets.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/reduce-motion.css'

import { App } from '@/app/app'
import { store } from '@/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
