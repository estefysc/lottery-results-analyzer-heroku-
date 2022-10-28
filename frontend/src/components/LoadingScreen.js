import React from "react";
import "./LoadingScreen.css";

function LoadingScreen() {
    return (
        <div className="loading-container">
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
        </div>

        // <div className="loading">
        //     <div className="loading__icon-wrap">
        //         <div className="loading__icon">Loading</div>
        //     </div>
        // </div>
    );
}

export default LoadingScreen;