import {createContext,useContext,useEffect,useState} from 'react'
import en from '../locales/en.json'
import ar from '../locales/ar.json'
const DICTS={en,ar}
const C=createContext(null)
export function LangProvider({children}){
  const [lang,setLang]=useState(()=>localStorage.getItem('lang')||'en')
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('lang',lang)},[lang])
  const t=(path)=>{const dict=DICTS[lang]||DICTS.en;return path.split('.').reduce((o,k)=>(o&&o[k]!==undefined?o[k]:path),dict)}
  return <C.Provider value={{lang,setLang,toggle:()=>setLang(l=>l==='en'?'ar':'en'),t}}>{children}</C.Provider>
}
export const useLang=()=>useContext(C)
