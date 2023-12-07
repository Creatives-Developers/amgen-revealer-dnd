import React from 'react';
export const Header=({isHideText}:{isHideText:boolean})=>{
    return(           
    <header className={`${isHideText?'hidden':''}`}>
        <img
          src={require(`../assets/images/header.png`)}
          alt={"header Image"}
          className="header-image"
        />
    </header>)
}