import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
import YouniteLogo from "../assets/images/younite Logo.png"
import AmgenLogo from "../assets/images/amgenlogo.jpg"
export default function Result({resultVisability}:{resultVisability:boolean}) {
    const [titleVisability,setTitleVisability]=useState(true)
    useEffect(()=>{
      let timer:any;
      if(resultVisability){
        timer = setTimeout(()=>{
          setTitleVisability(false)
      },4000)
      }
       
        return ()=> {
          timer&&  clearTimeout(timer)
        }
    },[resultVisability])
  return (
    <section className={`result-container ${resultVisability?'visible':''}`}>
     {resultVisability && titleVisability&&  <TypeAnimation
      sequence={[
        'Against all clouds, we were able to YOUnite!',
        1000
      ]}
      speed={50}
      repeat={0}
    />}
   {<article className={`content ${!titleVisability?'visible':''}`}>
   <p>
    As this year comes to an end, we would like to take the opportunity to appreciate what each one of YOU has brought to the organization.
    </p>
    <p>
    Amgen ELI team has accomplished so much together and together we celebrate! 
    </p>
    <p>
    Along with all the hope and promises the new year holds, We are thrilled to invite you to Amgen year-end closing event “YOUnite” on the 18th and 19th of December at Sofitel El-Gezirah. 
    </p>
    <p>
    Looking forward to starting our new milestone with plenty of energy!
    </p>
   </article>}
      <article className='footer'>
        <img src={AmgenLogo}/>
        <img src={YouniteLogo} />
      </article>
        </section>
  )
}
