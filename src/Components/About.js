import React from 'react'
import img from '../images/person.jpg';

const About = () => {
    return (
        <div className="main-container">
            <h1 className="main-heading">ABOUT ME</h1>
            <div className="about-container">
                
                    <div className="col1">
                        <div className="content-abt">
                            <p  className="introcontent">Hi There!</p>
                            <h1 className="intro">I'm Mohini</h1>
                            <p className="introcontent"> A self taught frontend developer based out of India whose main focus is to craft user interfaces using  modern frontend web technologies.<br/>I love combining the worlds of logic and creative design to make eye-catching,accessible and user-friendly websites.With every line of code, I strive to make the web a beautiful place.<br/>I'm excited to make the leap & continue refining my skills with the right company.
                            </p>
                        </div>
                    
                    </div>

                    <div className="col2">
                        <img className="programmer-img" src={img} alt="programmer"/>
                    </div>
                

            </div>
            
        </div>
    )
}

export default About
