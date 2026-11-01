import {createRoot} from 'react-dom/client'
import {ThemeProvider} from './context/ThemeContext'
import {LangProvider} from './context/LangContext'
import './styles/tokens.css'
import './styles/base.css'
import './components/ui/Button.css'
import './components/ui/Card.css'
import App from './App'
import './styles/glass.css'

const t=localStorage.getItem('theme')||'dark'
const l=localStorage.getItem('lang')||'en'
document.documentElement.dataset.theme=t
document.documentElement.lang=l
document.documentElement.dir=l==='ar'?'rtl':'ltr'
document.documentElement.setAttribute('translate','no')
document.documentElement.classList.add('notranslate')
document.body.classList.add('notranslate')
createRoot(document.getElementById('root')).render(<ThemeProvider><LangProvider><App/></LangProvider></ThemeProvider>)
