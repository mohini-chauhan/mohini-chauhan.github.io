import React from 'react';
/*import html from "../images/html.webp";*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHtml5,faCss3Alt,faBootstrap,faJsSquare,faReact} from "@fortawesome/free-brands-svg-icons";
import tailicon from "../images/tailwind-css.svg"

const Skills = () => {
    return (
        <div className="skill-main-container">
          <div className="skill-content">
            <h1>What About The Skills?</h1>
            <p>I'm a life-long learner and enjoy learning new stuffs!Below are some some toolkits,frameworks that I work with and like.</p>
            <div className="shape-wrapper">
              <div className="shape-container">
                <div className="shape">
                  <p><FontAwesomeIcon size="3x" icon={faHtml5} style={{color:"rgb(245 67 0)"}}/></p>
                </div>
              </div>
              <div className="shape-container">
                <div className="shape">
                  <p><FontAwesomeIcon size="3x" icon={faCss3Alt} style={{color:"#007bff"}}/></p>
                </div>
              </div>
              <div className="shape-container">
                <div className="shape">
                  <p><FontAwesomeIcon size="3x" icon={faReact} style={{color:"#00dcff"}}/></p>
                </div>
              </div>
              <div className="shape-container">
                <div className="shape">
                  <p><FontAwesomeIcon size="3x" icon={faJsSquare} style={{color:"#ffbf00"}}/></p>
                </div>
              </div>
              <div className="shape-container">
                <div className="shape">
                  <p><img src = {tailicon} alt="icon" className="ticon"/></p>
                </div>
              </div>
              <div className="shape-container">
                <div className="shape">
                  <p><FontAwesomeIcon size="3x" icon={faBootstrap} style={{color:"rgb(135 0 255)"}}/></p>
                </div>
              </div>
            </div>
          </div>
          
        </div>  
          
    )
}

export default Skills
