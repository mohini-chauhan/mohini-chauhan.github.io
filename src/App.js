import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
// import Particles from "react-particles-js";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Portfoliopage from "./Components/Portfoliopage";
import Contact from "./Components/Contact";

function App() {
  return (
    <>
      {/* <Particles
      className="particles-canvas"
      height="80%"
        params={{
          particles:{
            number:{
              value:30,
              density:{
                enable:true,
                value_area:800
              }
            },
            shape:{
              type:"circle",
              stroke:{
                width:6,
                color:"#f9b00"
              }
            }
          }
        }}
      /> */}
      
      <Navbar/>
      <Header/>
      <About/>
      <Skills/>
      <Portfoliopage/>
      <Contact/>

    </>
  );
}

export default App;
