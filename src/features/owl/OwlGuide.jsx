import {useEffect,useRef,useState} from 'react'
import {A} from '../../assets'
import {GUIDE_IDS} from '../../data'
import {ss} from '../../utils/storage'
import {useLang} from '../../context/LangContext'
import './OwlGuide.css'

const clampGuidePosition=(x,y,rect)=>{
 const margin=8
 return {x:Math.min(Math.max(margin,x),Math.max(margin,window.innerWidth-rect.width-margin)),y:Math.min(Math.max(margin,y),Math.max(margin,window.innerHeight-rect.height-margin))}
}

export function OwlGuide(){const {lang,t}=useLang();
 const [msg,setMsg]=useState(''),[show,setShow]=useState(false),[muted,setMuted]=useState(ss('owlMute')==='1'),[side,setSide]=useState(ss('owlSide')||'r'),[hidden,setHidden]=useState(ss('owlHidden')==='1'),[pos,setPos]=useState(null)
 const seen=useRef(JSON.parse(ss('owlSeen')||'{}')),cur=useRef('home'),msgKey=useRef(''),mu=useRef(muted),timerRef=useRef(),drag=useRef(null),imgRef=useRef(null),guideRef=useRef(null),tRef=useRef(t)
 tRef.current=t
 const say=(k,force,repeat=false)=>{const text=tRef.current('owl.'+k);if(!text||text==='owl.'+k)return;if(force){mu.current=false;setMuted(false);ss('owlMute','')}else if(mu.current||(!repeat&&seen.current[k]))return
  seen.current[k]=1;ss('owlSeen',JSON.stringify(seen.current));msgKey.current=k;setMsg(text);setShow(true);clearTimeout(timerRef.current);const duration=window.matchMedia('(max-width:600px)').matches?6000:11000;timerRef.current=setTimeout(()=>setShow(false),duration)}
 useEffect(()=>{if(msgKey.current){const text=t('owl.'+msgKey.current);if(text&&text!=='owl.'+msgKey.current)setMsg(text)}if(!ss('owlSide'))setSide(lang==='ar'?'l':'r')},[lang])
 useEffect(()=>{let frame=0;const update=()=>{frame=0;const marker=window.innerHeight*.42;let active='',best=Infinity
  GUIDE_IDS.forEach(id=>{const section=document.getElementById(id);if(!section)return;const {top,bottom}=section.getBoundingClientRect();if(bottom<=0||top>=window.innerHeight)return;const distance=marker<top?top-marker:marker>bottom?marker-bottom:0;if(distance<best){best=distance;active=id}})
  if(active&&active!==cur.current){cur.current=active;say(active,false,true)}}
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();const mobile=window.matchMedia('(max-width:600px)').matches;timerRef.current=setTimeout(()=>say(cur.current==='home'?'welcome':cur.current,false,mobile),1200)
  const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(schedule,{rootMargin:'-35% 0px -35% 0px'})
  GUIDE_IDS.forEach(id=>{const section=document.getElementById(id);if(section)observer?.observe(section)})
  return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);if(frame)cancelAnimationFrame(frame);observer?.disconnect();clearTimeout(timerRef.current)}
 },[])
 useEffect(()=>{if(!pos||!guideRef.current)return;const rect=guideRef.current.getBoundingClientRect();const next=clampGuidePosition(pos.x,pos.y,rect);if(next.x!==pos.x||next.y!==pos.y)setPos(next)},[pos,show,msg,side])
 useEffect(()=>{const keepInView=()=>setPos(current=>{if(!current||!guideRef.current)return current;const rect=guideRef.current.getBoundingClientRect();const next=clampGuidePosition(current.x,current.y,rect);return next.x===current.x&&next.y===current.y?current:next});window.addEventListener('resize',keepInView);return()=>window.removeEventListener('resize',keepInView)},[])
 // mouse follow
 useEffect(()=>{
   const onMove=(e)=>{
     if(!imgRef.current||hidden||muted) return
     const r=imgRef.current.getBoundingClientRect()
     const cx=r.left+r.width/2, cy=r.top+r.height/2
     const dx=e.clientX-cx, dy=e.clientY-cy
     const ang=Math.atan2(dy,dx)*180/Math.PI
     imgRef.current.style.transform=`rotate(${Math.max(-12,Math.min(12,ang*0.15))}deg)`
   }
   window.addEventListener('mousemove',onMove)
   return()=>window.removeEventListener('mousemove',onMove)
 },[hidden,muted])
 // drag
 const startDrag=(e)=>{
   const rect=guideRef.current?.getBoundingClientRect()
   if(!rect)return
   drag.current={ox:e.clientX-rect.left,oy:e.clientY-rect.top}
   const move=(ev)=>{const bounds=guideRef.current?.getBoundingClientRect();if(bounds&&drag.current)setPos(clampGuidePosition(ev.clientX-drag.current.ox,ev.clientY-drag.current.oy,bounds))}
   const up=()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up);drag.current=null}
   window.addEventListener('mousemove',move);window.addEventListener('mouseup',up)
 }
 if(hidden) return <button className="ob min" style={{position:'fixed',right:14,bottom:14,zIndex:60}} aria-label={t('owl.show')} onClick={()=>{setHidden(false);ss('owlHidden','')}}>🦉</button>
 return <div ref={guideRef} className={'guide'+(side==='l'?' l':'')} style={pos?{left:pos.x,top:pos.y,right:'auto',bottom:'auto'}:{}}><div className="bub" role="status" aria-live="polite" hidden={!show}><span>{msg}</span><div className="bc">
  <button aria-label={t('owl.moveSide')} onClick={()=>{const s=side==='l'?'r':'l';setSide(s);ss('owlSide',s)}}>⇄</button>
  <button aria-label={t('owl.hide')} onClick={()=>{setHidden(true);ss('owlHidden','1')}}>×</button></div></div>
  <button className={'ob'+(muted?' min':'')} aria-label={t('owl.openGuide')} onClick={()=>show?setShow(false):say(cur.current==='home'?'welcome':cur.current,true)} onMouseDown={startDrag}><img ref={imgRef} src={A.owlPen} alt=""/></button></div>}
