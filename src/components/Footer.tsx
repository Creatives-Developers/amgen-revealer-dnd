import React from 'react';
export const Footer= ({isHideText}:{isHideText:boolean}) => {
    return(           
    <footer className={`${isHideText?'hidden':''}`}>
        <img
          src={require(`../assets/images/amgenlogo.webp`)}
          alt={"Footer Image"}
          className="footer-image"
        />
    </footer>)
}