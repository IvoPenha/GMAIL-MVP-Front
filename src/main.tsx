import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import Routes from './routes/router.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './contexts/auth-context.tsx'
import { getCurrentAccount } from './core/cache/current-account.ts'
import { theme } from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
    >
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
        onScriptLoadSuccess={() => { console.log('deu certo ó') }}
        onScriptLoadError={() => console.log('deu ruim')}
      >
        <AuthProvider
          getCurrentAccount={getCurrentAccount}
        >
          <Routes />
        </AuthProvider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
