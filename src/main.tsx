import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { registerSW } from 'virtual:pwa-register'
import { AnimatePresence } from 'framer-motion'

import { theme } from './theme'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AnimatePresence exitBeforeEnter>
            <ChakraProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<App />} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </AnimatePresence>
    </>,
)

if ('serviceWorker' in navigator) {
    registerSW()
}
