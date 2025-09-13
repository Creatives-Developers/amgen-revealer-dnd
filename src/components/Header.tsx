import React from 'react';
export const Header=({isHideText,setHideText}:{isHideText:boolean,setHideText:Function})=>{
    return( 
    <>
    <div className={`overlay ${isHideText?'hidden':''}`}></div>
    <header className={`${isHideText?'hidden':''}`}>
        <p>A foggy year can hold the most appreciable blessings as well!</p>
        <p>Drag all the clouds right and left to reveal them  </p>
        <p>and when you’re done, we have a message for you! Wait for it. </p>
        <button className='ok-button' onClick={()=>{
            setHideText(true)
        }}>Ok</button>
    </header>
    </>)
}