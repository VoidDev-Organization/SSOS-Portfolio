import {useEffect,useState} from 'react'
import {useLang} from '../../context/LangContext'
import './Lightbox.css'

export function Lightbox({images=[],index=0,onClose}){
  const {t}=useLang()
  const [i,setI]=useState(index)
  useEffect(()=>{
    const onKey=(e)=>{
      if(e.key==='Escape') onClose()
      if(e.key==='ArrowRight') setI(x=>Math.min(images.length-1,x+1))
      if(e.key==='ArrowLeft') setI(x=>Math.max(0,x-1))
    }
    window.addEventListener('keydown',onKey)
    document.body.style.overflow='hidden'
    return ()=>{
      window.removeEventListener('keydown',onKey)
      document.body.style.overflow=''
    }
  },[images.length,onClose])
  if(!images.length) return null
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label={t("common.close")}>×</button>
      {images.length>1 && <button className="lb-prev" onClick={(e)=>{e.stopPropagation();setI(x=>Math.max(0,x-1))}} aria-label={t("common.previous")}>‹</button>}
      <img className="lb-img" src={images[i]} alt="" onClick={(e)=>e.stopPropagation()}/>
      {images.length>1 && <button className="lb-next" onClick={(e)=>{e.stopPropagation();setI(x=>Math.min(images.length-1,x+1))}} aria-label={t("common.next")}>›</button>}
    </div>
  )
}
