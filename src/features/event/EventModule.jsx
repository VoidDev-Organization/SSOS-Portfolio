import {A} from '../../assets'
import {stateOf,fmt} from '../../utils/events'
import {useLang} from '../../context/LangContext'
import {CalendarIcon,LocationIcon} from '../../components/ui/MetaIcons'
import {CountdownRings} from './CountdownRings'
import './EventModule.css'

export function EventModule({e}){
 const {t,lang}=useLang()
 if(!e)return <div className="evt evt-empty" style={{gridTemplateColumns:'1fr'}}><div className="evt-copy"><span className="pill">{t('event.noneScheduled')}</span><h2>{t('event.noEvent')}</h2><p>{t('event.checkBack')}</p></div></div>
 const st=stateOf(e),live=st==='live'
 const dateLabel=lang==='ar'&&e.startDate?new Intl.DateTimeFormat('ar',{dateStyle:'full',timeStyle:'short',timeZone:e.timezone}).format(new Date(e.startDate))+' ('+e.timezone+')':null
 return <div className="evt">
  <div className="evt-copy">
   <img className="evt-wordmark" src={A.nexusBanner} alt="Nexus Youth · Connect, Learn, Grow"/>
   <span className={'pill'+(live?' live':'')}>{live?t('event.live'):st==='tbd'?t('event.dateTbd'):t('event.notStarted')}</span>
   <h2>{e.title}</h2>
   <p>{lang==='ar'&&e.descriptionAr?e.descriptionAr:e.description}</p>
   <div className="meta">
	{e.startDate&&<div className="meta-item"><CalendarIcon/>{dateLabel||fmt(e)}</div>}
	<div className="meta-item"><LocationIcon/>{lang==='ar'&&e.locationAr?e.locationAr:e.location}</div>
   </div>
   {e.ticketUrl?<a className="btn gold" href={e.ticketUrl} target="_blank" rel="noopener noreferrer">{live?t('event.joinNow'):t('event.getTicket')}<span aria-hidden="true">↗</span></a>:<span className="btn off" role="note">{t('event.accessComing')}</span>}
  </div>
  <div className="evt-visual">
   <img className="evt-photo" src={A.nexusFlashlight} alt="A beam of light over Nexus Youth's geometric brand pattern"/>
   <div className="cd-panel"><h3 className="cd-title">{t('event.countdownTitle')}</h3><CountdownRings e={e} st={st}/></div>
  </div>
 </div>
}
