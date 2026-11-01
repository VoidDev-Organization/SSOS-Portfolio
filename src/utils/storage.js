export const ss=(k,v)=>{try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch{}}
