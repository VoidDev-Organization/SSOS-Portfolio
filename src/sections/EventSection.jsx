import {EventModule} from '../features/event/EventModule'

export function EventSection({event}){
  return (
 <section id="event" style={{paddingTop:24}}><div className="wrap"><EventModule e={event}/></div></section>
  )
}