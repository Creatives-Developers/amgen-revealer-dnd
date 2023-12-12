import React from 'react';
export const Header=({isHideText,setHideText}:{isHideText:boolean,setHideText:Function})=>{
    return( 
    <>
    <div className={`overlay ${isHideText?'hidden':''}`}></div>
    <header className={`${isHideText?'hidden':''}`}>
        
        <p>A foggy year can hold the most appreciable blessings as well!</p>
        <p>Drag All the clouds right and left to reveal them   <button className='ok-button' onClick={()=>{
            setHideText(true)
        }}>ok</button></p>
      
    </header>
    </>)
}