import {useLang} from '../../context/LangContext'
import './ProjectCard.css'

export function ProjectCard({x}){const {t}=useLang();return <a className="card pcard" href={'#p-'+x.ev}><div className="im"><img loading="lazy" src={x.img} alt={x.t}/></div><div className="bd"><div className="meta2">{x.c.map(c=>t('categories.'+c)).join(' · ')}</div><h3>{x.t}</h3><p>{x.d}</p>{x.g&&<p><b>{t('project.gain')}</b> {x.g}</p>}<span className="go">{t('project.view')}</span></div></a>}
