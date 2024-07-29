import React, {useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";

import "./MainInfo.css";
import axios from "axios";

function MainInfo() {
    const [show, setShow] = useState(false);

    function initData() {
        axios.get("https://lottery-analyzer.herokuapp.com", {crossdomain: true}).catch(error => console.error(error));
    }

    useEffect(() => setShow(true), []);
    useEffect(() => initData(), []);

    return (
        <div className="main-info">
            <div className="main-info-text">
                <h1 className="quote">
                    <q>Millions saw the apple fall, but Newton asked why.</q> -Bernard Baruch
                </h1>
                <h3 className="main-info-question">
                    Curious about numbers?
                </h3>
                <CSSTransition
                    in={show}
                    timeout={1500}
                    classNames="slide"
                >
                    <p className="main-info-answer">
                        There are more than 42 million people in the United States who play the lottery every week.
                        Explore this app to find some number patterns in the Florida Lotto drawings.
                    </p>
                </CSSTransition>
            </div>
        </div>
    );
}

export default MainInfo;