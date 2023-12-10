import React from 'react';
export const Header=({isHideText}:{isHideText:boolean})=>{
    return(           
    <header className={`${isHideText?'hidden':''}`}>
        {/* <img
          src={require(`../assets/images/header.png`)}
          alt={"header Image"}
          className="header-image"
        /> */}
        <p>A foggy year can hold the most appreciable blessings as well!</p>
        <p>Drag the clouds right and left to reveal them</p>
    </header>)
}