import {featured} from '../utils/events'
import {demo} from '../utils/env'
import {Header} from '../components/layout/Header'
import {Footer} from '../components/layout/Footer'
import {OwlGuide} from '../features/owl/OwlGuide'
import {HeroSection} from '../sections/HeroSection'
import {EventSection} from '../sections/EventSection'
import {AboutSection} from '../sections/AboutSection'
import {ImpactSection} from '../sections/ImpactSection'
import {ProjectsSection} from '../sections/ProjectsSection'
import {SponsorsSection} from '../sections/SponsorsSection'
import {ContactSection} from '../sections/ContactSection'
import './Home.css'

export function Home({events}){
  const next=featured(events)
  return (
    <>
      {demo&&<div className="demo">Demo mode (?demo={demo}) — test data only</div>}
      <Header/>
      <main>
        <HeroSection/>
        <EventSection event={next}/>
        <AboutSection/>
        <ImpactSection/>
        <ProjectsSection events={events}/>
        <SponsorsSection/>
        <ContactSection/>
      </main>
      <Footer/>
      <OwlGuide/>
    </>
  )
}
