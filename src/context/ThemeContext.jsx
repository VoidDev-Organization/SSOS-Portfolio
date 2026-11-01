import {createContext,useContext,useEffect,useState} from 'react'
const C=createContext(null)
export function ThemeProvider({children}){
  const [theme,setTheme]=useState(()=>localStorage.getItem('theme')||'dark')
  useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme)},[theme])
  return <C.Provider value={{theme,toggle:()=>setTheme(t=>t==='dark'?'light':'dark')}}>{children}</C.Provider>
}
export const useTheme=()=>useContext(C)
