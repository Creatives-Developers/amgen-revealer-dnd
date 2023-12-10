import React from 'react'
import { TypeAnimation } from 'react-type-animation';
export default function Result({resultVisability}:{resultVisability:boolean}) {
  return (
    <section className={`result-container ${resultVisability?'visible':''}`}>
     {resultVisability&&  <TypeAnimation
      sequence={[
        'Against all clouds, we were able to YOUnite!',
        1000
      ]}
      speed={50}
      repeat={0}
    />}
   <article className='content'>
   <p>
    As this year comes to an end, we would like to take the opportunity to appreciate what each one of YOU has brought to the organization.
    </p>
    <p>
    Amgen ELI team has accomplished so much together and together we celebrate! 
    </p>
    <p>
    Along with all the hope and promises the new year holds, We are thrilled to invite you to Amgen year-end closing event “YOUnite” on the 18th and 19th of December at Nile Sofitel. 
    </p>
    <p>
    Looking forward to starting our new milestone with plenty of energy!
    </p>
   </article>
        </section>
  )
}
