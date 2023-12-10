import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
function App() {
  const [isHideText,setHideText] = useState(false);
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setHideText(true);
    },5000)
    return ()=>{
      clearTimeout(timer)
    }
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
           <Header isHideText={isHideText}/>
            <Home />
            <Footer isHideText={isHideText}/>
          </>
       }></Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
