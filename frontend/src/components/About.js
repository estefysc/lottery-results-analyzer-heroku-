import React, {useState, useEffect} from 'react';
import {CSSTransition} from "react-transition-group";

import './About.css';

function About() {
    const [show, setShow]= useState(false);

    useEffect(() => setShow(true), []);

    return (
        <div>
            <h1 className="first-title">The App</h1>
            <CSSTransition
                in={show}
                timeout={1000}
                classNames="fade"
            >
                <p className="about-app-pgh">
                    Everytime you access this app, the lottery results are updated through website-scrapping. The app currently shows the six most frequent numbers
                    and the amount of times, as a percentage, even numbers appear in the result sets. More insights will be added in the future.
                    This app is built with React, Node JS, and Express.
                </p>
            </CSSTransition>
            <h2 className="second-title">The Creator</h2>
            <CSSTransition
                in={show}
                timeout={1000}
                classNames="fade"
            >
                <p className="about-creator-pgh">
                    Estefanía Sánchez, born in Peru and raised in Mexico, graduated from Valencia College with a Bachelor of Applied Science in Software Development with a minor in music theory and composition.
                    Some of her passions include art, soccer, and technology. She aims to explore creativity, machine learning, and artificial intelligence as she continues her education beyond her bachelor's degree.
                    Check out the code for this app and other projects{' '}
                    <a href="https://github.com/estefysc?tab=repositories" target="_blank" rel="noopener noreferrer">
                        here
                    </a>
                    .
                </p>
            </CSSTransition>
        </div>
    );
}

export default About;