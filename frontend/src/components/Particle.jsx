import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Particle() {
    const optionsVar = {
        "fullScreen": {
            "enable": true,
            "zIndex": -1
        },
        background: {
            color: {
                value: "#0B0C10",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#45A29E",
            },
            links: {
                color: "#66FCF1",
                distance: 130,
                enable: true,
                opacity: 0.3,
                width: 0.8,
            },
            collisions: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 4.1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.35,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 0.5, max: 3.5 },
            },
        },
        detectRetina: true,
    };

    const particlesInit = async (main) => {
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        // console.log(container);
        // Future use
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={optionsVar}
        />
    );
}

export default Particle;