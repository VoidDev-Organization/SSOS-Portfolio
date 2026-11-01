import {useEffect,useRef} from 'react'
import {EventModule} from '../features/event/EventModule'

export function EventSection({event}){
  const sectionRef=useRef(null)
  const wasIntersecting=useRef(false)
  useEffect(()=>{
    if(!event||!sectionRef.current)return
    const checkVisibility=()=>{
      const rect=sectionRef.current?.getBoundingClientRect()
      const visible=Boolean(rect&&rect.bottom>window.innerHeight*.15&&rect.top<window.innerHeight*.85)
      if(visible&&!wasIntersecting.current){
        const card=sectionRef.current.querySelector('.evt')
        if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
          card?.classList.add('evt-glow-static')
        }else if(card){
          card.classList.remove('evt-glow-static','evt-glow')
          void card.offsetWidth
          card.classList.add('evt-glow')
        }
      }else if(!visible){
        sectionRef.current?.querySelector('.evt')?.classList.remove('evt-glow-static')
      }
      wasIntersecting.current=visible
    }
    checkVisibility()
    window.addEventListener('scroll',checkVisibility,{passive:true})
    window.addEventListener('resize',checkVisibility)
    return()=>{
      window.removeEventListener('scroll',checkVisibility)
      window.removeEventListener('resize',checkVisibility)
    }
  },[event?.id])
  return (
   <section ref={sectionRef} id="event" style={{paddingTop:24}}><div className="wrap"><EventModule e={event}/></div></section>
  )
}