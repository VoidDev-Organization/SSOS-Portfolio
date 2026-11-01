import {useEffect,useState} from 'react'
import {A} from '../assets'
import {Reveal} from '../components/ui/Reveal'
import ScrollReveal from '../components/ui/ScrollReveal/ScrollReveal'
import Folder from '../components/ui/Folder'
import {useLang} from '../context/LangContext'
import {useTheme} from '../context/ThemeContext'
import './AboutSection.css'

export function AboutSection(){
  const {t}=useLang()
  const {theme}=useTheme()
  const [folderSize,setFolderSize]=useState(()=>window.matchMedia('(max-width:600px)').matches?0.72:1.1)
  useEffect(()=>{const media=window.matchMedia('(max-width:600px)');const update=()=>setFolderSize(media.matches?0.72:1.1);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[])
  const items=[
    {title:t('about.mission'), description:t('about.missionText')},
    {title:t('about.vision'), description:t('about.visionText')},
    {title:t('about.community'), description:t('about.communityText')},
    {title:t('about.education'), description:t('about.educationText')},
    {title:t('about.career'), description:t('about.careerText')},
    {title:t('about.role'), description:t('about.roleText')},
  ]
  return (
 <section className="about" id="about"><div className="wrap"><Reveal><div className="top"><div><span className="eyebrow">{t('about.eyebrow')}</span><h2>{t('about.title')}</h2><ScrollReveal as="div"><p className="lead">{t('hero.lead')}</p></ScrollReveal></div><img src={A.owlPen} alt="" aria-hidden="true"/></div>
 <div className="about-folders">{items.map((it,i)=><Folder key={i} label={it.title} items={[it]} size={folderSize} color={theme==='light'?'#315E91':'#6a2bd1'} theme={theme}/>)}</div></Reveal></div></section>
  )
}
