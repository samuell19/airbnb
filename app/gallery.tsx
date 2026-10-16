'use client';
import {useEffect,useState} from 'react';
import galleries from './galleries.json';
export default function Gallery({url,image,title,dates,score}:{url:string;image:string;title:string;dates:string;score:number}){
 const id=url.match(/rooms\/(\d+)/)?.[1]||'';
 const images=(galleries as Record<string,string[]>)[id]||(image?[image]:[]);
 const [index,setIndex]=useState(0),[open,setOpen]=useState(false),[failed,setFailed]=useState(false);
 const move=(n:number)=>{setIndex(i=>(i+n+images.length)%images.length);setFailed(false)};
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'){e.preventDefault();move(1)}};window.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key)}},[open,images.length]);
 return <><div className="photo">{images.length>0&&<button className="photo-open" onClick={()=>setOpen(true)} aria-label={'Ampliar fotos de '+title}><img src={images[index]} alt={`${title} — foto ${index+1}`} loading="lazy"/></button>}<span className="tag">18–19/10</span><span className="score">★ {score?score.toFixed(1):'—'}</span>{images.length>1&&<><button className="gallery-arrow prev" onClick={()=>move(-1)} aria-label="Foto anterior">‹</button><button className="gallery-arrow next" onClick={()=>move(1)} aria-label="Próxima foto">›</button><span className="photo-count">{index+1} / {images.length}</span></>}</div>{open&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={'Fotos de '+title} onClick={e=>{if(e.target===e.currentTarget)setOpen(false)}}><button className="lightbox-close" autoFocus onClick={()=>setOpen(false)} aria-label="Fechar fotos">×</button><span className="lightbox-title">{title} · {index+1} / {images.length}</span>{failed?<p>Não foi possível carregar esta foto.</p>:<img key={images[index]} src={images[index]} alt={`${title} — foto ${index+1}`} onError={()=>setFailed(true)}/>}<button className="gallery-arrow prev" onClick={()=>move(-1)} aria-label="Foto anterior">‹</button><button className="gallery-arrow next" onClick={()=>move(1)} aria-label="Próxima foto">›</button></div>}</>;
}

