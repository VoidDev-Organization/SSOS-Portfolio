import {A} from '../assets'
import {Reveal} from '../components/ui/Reveal'
import {CountUp} from '../components/ui/CountUp'
import {LocationIcon} from '../components/ui/MetaIcons'
import {useLang} from '../context/LangContext'
import './ImpactSection.css'

export function ImpactSection(){const {t,lang}=useLang();return (
 <section id="impact"><div className="wrap"><Reveal><span className="eyebrow">{t('impact.eyebrow')}</span><h2>{t('impact.title')}</h2><p className="lead">{t('impact.lead')}</p>
 <div className="tot"><div className="num"><CountUp to={2000}/></div><p><b>{t('impact.combined')}</b> {t('impact.combinedNote')}</p></div>
 <div className="grid g3" style={{marginTop:30}}>
 <div className="card ed e1"><img src={A.logo1} alt={t('impact.firstLogoAlt')}/><h3>{t('impact.first')}</h3><div className="num"><CountUp to={700}/></div><small>{t('impact.reported')}</small><p className="location-meta" style={{marginTop:10}}><LocationIcon/>{t('impact.rwa')}</p></div>
 <div className="card ed e2"><img className="edition-wordmark" src={A.wmLight} alt={t('impact.secondLogoAlt')}/><h3>{t('impact.second')}</h3><div className="num"><CountUp to={1300}/></div><small>{t('impact.reported')}</small><p className="location-meta" style={{marginTop:10}}><LocationIcon/>{t('impact.rwa')}</p></div>
 <div className="card ed e3"><img className="vec" src={A.logoDark} alt={t('impact.logoAlt')} width="91" height="54"/><h3>NEXUS YOUTH</h3><div className="num" style={{fontSize:'2rem'}}>{t('impact.comingNext')}</div><small>{t('impact.current')}</small><p className="location-meta" style={{marginTop:10}}><LocationIcon/>{t('impact.rwa')} · {t('impact.nexusDate')} · {t('impact.building')}</p></div></div></Reveal></div></section>
  )
}
