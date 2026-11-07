import {useEffect} from 'react'
import {A} from '../assets'
import {CATS,SPONSORS} from '../data'
import {go} from '../utils/scroll'
import {useLang} from '../context/LangContext'
import {useTheme} from '../context/ThemeContext'
import {ovr} from '../features/projects/utils'
import {stateOf} from '../utils/events'
import {CalendarIcon,LocationIcon} from '../components/ui/MetaIcons'
import {Header} from '../components/layout/Header'
import LogoLoop from '../components/ui/LogoLoop/LogoLoop'
import '../components/ui/LogoLoop/LogoLoop.css'
import {Footer} from '../components/layout/Footer'
import AnimatedContent from '../components/ui/AnimatedContent/AnimatedContent'
import {ProjectCard} from '../features/projects/ProjectCard'
import {Lightbox} from '../components/ui/Lightbox'
import {useState} from 'react'
import SpotlightCard from '../components/ui/SpotlightCard/SpotlightCard'
import '../components/ui/SpotlightCard/SpotlightCard.css'
import ProfileCard from '../components/ui/ProfileCard/ProfileCard'
import './ProjectDetail.css'
import '../components/ui/LogoGrid.css'

export function ProjectDetail({events,slug}){const {lang,t}=useLang();const {theme}=useTheme();const e=events.find(x=>x.slug===slug);const [lb,setLb]=useState(null);useEffect(()=>{scrollTo(0,0);document.title=(e?e.title:'SSOS')+' — SSOS';return()=>{document.title='SSOS — Sudanese Students Online Summit, Rwanda'}},[e])
 const back=()=>{history.replaceState(null,'',location.pathname+location.search);dispatchEvent(new HashChangeEvent('hashchange'));setTimeout(()=>go('projects'),60)}
 if(!e)return <><Header back={back}/><main className="wrap detail"><p>{t('project.notfound')}</p></main></>
 const sp=SPONSORS.filter(s=>e.sponsorEd&&s.ed===e.sponsorEd),rel=events.filter(x=>x.id!==e.id&&x.published&&stateOf(x)==='ended')
 const list=(t,a)=>a?.length>0&&<><h3>{t}</h3><div className="chips">{a.map(x=><span key={x}>{x}</span>)}</div></>
 const backgroundImage=e.slug==='first-edition'?A.studyLibrary:e.slug==='second-edition'?A.studyCollaboration:A.educationAudience
 return <><Header back={back}/><main className="wrap detail" style={{'--detail-image':`url("${backgroundImage}")`}}><AnimatedContent><button className="back" onClick={back}>{t('project.back')}</button><span className="eyebrow">{e.cats.map(c=>t('categories.'+c)).join(' · ')}</span><h1>{e.title}</h1><p className="lead">{lang==='ar'&&e.descriptionAr?e.descriptionAr:e.description}</p>
 <div className="chips detail-meta" style={{marginTop:18}}>{e.dateLabel&&<span className="icon-meta"><CalendarIcon/>{lang==='ar'&&e.dateLabelAr?e.dateLabelAr:e.dateLabel}</span>}{e.time&&<span>🕘 {e.time}</span>}<span className="icon-meta"><LocationIcon/>{lang==='ar'&&(e.locationAr)?e.locationAr:e.location}</span>{e.beneficiaries&&<span className="detail-beneficiaries">👥 {e.beneficiaries.toLocaleString()} {t('project.beneficiaries')}</span>}</div>
 {list(t('project.workshops'),e.workshops)}{list(t('project.guests'),e.guests)}{list(t('project.speakers'),e.speakers)}
 {e.gallery.length>0&&<><h3>{t('project.gallery')}</h3><div className="gal">{e.gallery.map((g,i)=><SpotlightCard key={i}><img loading="lazy" src={g} alt={e.title+' '+t('project.galleryAlt')+' '+(i+1)} style={{cursor:'zoom-in'}} onClick={()=>setLb(i)}/></SpotlightCard>)}</div></>}
 {lb!==null&&<Lightbox images={e.gallery} index={lb} onClose={()=>setLb(null)}/>}
 {sp.length>0&&<><h3>{t('project.sponsors')}</h3><LogoLoop logos={sp.map(s=>({src:s.logo,alt:s.name,title:s.name}))} speed={60} logoHeight={154} gap={32} hoverSpeed={0} fadeOut fadeOutWidth={80} draggable scrollBoost={0.12} ariaLabel={t('project.sponsorsAria')}/></>}
 {rel.length>0&&<><h3>{t('project.related')}</h3><div className="grid g3 related-projects">{rel.map(x=>{const c=ovr(x);return <a className="related-project-link" key={x.id} href={'#p-'+x.slug} style={{'--related-color':c.color}}><span className="related-project-label"><img src={c.logo} alt=""/><span>{c.t}</span></span><ProfileCard avatarUrl={c.img} name={c.t} title={c.d} handle={c.ev} status={t('common.completed')} showUserInfo={false} theme={theme}/></a>})}</div></>}</AnimatedContent></main><Footer/></>}
