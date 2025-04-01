import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Particle from "./components/Particle";
import Navigation from "./components/Navigation"
import LoadingScreen from "./components/LoadingScreen";
import MainInfo from "./components/MainInfo";
import About from "./components/About";
import {Routes,Route} from "react-router-dom";
import FrequentNums from "./components/FrequentNums";
import EvenOdds from "./components/EvenOdds";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    return (
        <div>
            {loading ?
                (<LoadingScreen />) :
                (
                    <div>
                        <Navigation fixed="top"/>
                        <Particle />
                        <Routes>
                            <Route path="/" element={<MainInfo />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/frequentNums" element={<FrequentNums />} />
                            <Route path="/evenOdds" element={<EvenOdds />} />
                            <Route path="/allNums" element={<AllNums />} />
                        </Routes>
                    </div>
                )
            }
        </div>
    );
}



export default App;
