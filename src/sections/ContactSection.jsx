import {useState} from 'react'
import {A} from '../assets'
import {CONFIG} from '../data'
import {useLang} from '../context/LangContext'
import './ContactSection.css'

const email = CONFIG.contact || 'contact@ssos.org'

export function ContactSection(){const {t}=useLang();
  const [form,setForm]=useState({name:'',email:'',message:''})
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState(null)
  const handleChange=e=>{const {name,value}=e.target;setForm(c=>({...c,[name]:value}));setStatus(null)}
  const handleSubmit=async e=>{
    e.preventDefault(); if(loading) return
    setLoading(true); setStatus(null)
    try{
      const subject=encodeURIComponent(`New SSOS contact from ${form.name.trim()}`)
      const body=encodeURIComponent(`Name: ${form.name.trim()}\\nEmail: ${form.email.trim()}\\n\\n${form.message.trim()}`)
      window.location.href=`mailto:${email}?subject=${subject}&body=${body}`
      setStatus({type:'success',message:t('contact.success')})
      setForm({name:'',email:'',message:''})
    }catch(err){
      setStatus({type:'error',message:t('contact.error')+' '+email})
    }finally{setLoading(false)}
  }
  return (
  <section id="contact"><div className="wrap"><div className="contact-grid">
    <div className="contact-form">
      <span className="eyebrow">{t('contact.eyebrow')}</span>
      <h2>{t('contact.title')}.</h2>
      {status&&<p className={'status '+status.type}>{status.message}</p>}
      <div className="contact-links">
        <a href={'mailto:'+email}>{email}</a>
      </div>
      <div className="socials" aria-label={t('contact.socialLabel')} style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}>
        {CONFIG.social && Object.entries({TikTok:CONFIG.social.tiktok,Facebook:CONFIG.social.facebook,Instagram:CONFIG.social.instagram,'X (Twitter)':CONFIG.social.x,LinkedIn:CONFIG.social.linkedin,YouTube:CONFIG.social.youtube}).map(([k,v])=><a key={k} href={v} target="_blank" rel="noopener noreferrer" className="social-pill">{k}</a>)}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label><span>{t('contact.name')}</span><input type="text" name="name" required value={form.name} onChange={handleChange} placeholder={t('contact.placeholderName')}/></label>
        <label><span>{t('contact.email')}</span><input type="email" name="email" required value={form.email} onChange={handleChange} placeholder={t('contact.placeholderEmail')}/></label>
        <label><span>{t('contact.message')}</span><textarea rows={6} name="message" required value={form.message} onChange={handleChange} placeholder={t('contact.placeholderMsg')}/></label>
        <button type="submit" disabled={loading} className="btn pri">{loading?t('common.send')+'...':t('common.send')}</button>
      </form>
    </div>
    <div className="contact-visual"><img src={A.owl} alt={t('contact.owlAlt')} width="260" height="272"/></div>
  </div></div></section>)
}