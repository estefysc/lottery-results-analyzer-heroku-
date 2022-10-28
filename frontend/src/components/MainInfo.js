import React, {useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";

import "./MainInfo.css";
import axios from "axios";

function MainInfo() {
    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => setShow(true))
    // }, []);

    function initData() {
        axios.get("http://localhost:5000/", {crossdomain: true}).then();
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
                        And, most of them think that it’s just a matter of luck or fate. However, lotteries are also a game of numbers, not only chance.
                        Explore this app to find some number patters in the Florida Lotto draws.
                    </p>
                </CSSTransition>
            </div>
        </div>
    );
}

export default MainInfo;