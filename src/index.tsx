import React from 'react'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { deepOrange, teal } from '@mui/material/colors'
import { CssBaseline } from '@mui/material'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { App } from './app/App'

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
})

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)

serviceWorker.unregister()
