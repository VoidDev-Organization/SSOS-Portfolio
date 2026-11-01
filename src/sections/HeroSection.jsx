import {A} from '../assets'
import {NavLink} from '../components/layout/NavLink'
import BlurText from '../components/ui/BlurText/BlurText'
import {useLang} from '../context/LangContext'
import './HeroSection.css'

export function HeroSection(){const {t}=useLang();return (
 <section className="hero" id="home"><div className="wrap"><div><span className="eyebrow">{t('common.learn')}</span><h1 style={{marginTop:14}}><BlurText text={t('hero.title')} delay={150} animateBy="words" direction="top"/></h1>
 <p className="lead">{t('hero.lead')}</p>
 <div className="cta"><NavLink id="event" className="btn pri">{t('common.discover')}</NavLink><NavLink id="projects" className="btn sec">{t('common.explore')}</NavLink></div></div>
 <div className="stage"><img src={A.owl} alt={t('hero.owlAlt')} width="400" height="420"/></div></div></section>
  )
}