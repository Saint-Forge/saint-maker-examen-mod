import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { registerSW } from 'virtual:pwa-register'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'

import { store } from '~store'

import { theme } from './theme'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
            <AnimatePresence exitBeforeEnter>
                <ChakraProvider theme={theme}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<App />} />
                        </Routes>
                    </Router>
                </ChakraProvider>
            </AnimatePresence>
        </Provider>
    </>,
)

if ('serviceWorker' in navigator) {
    registerSW()
}
