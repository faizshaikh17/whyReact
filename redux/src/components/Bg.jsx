import React from "react";
import App from '../App'

export default function GridBackgroundDemo() {
    return (
        (<div
            className="h-[45rem] w-full bg-black  bg-grid-white/[0.2]  relative ">

            {/* Radial gradient for the container to give a faded look */}
            <App />

            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-cente bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>)
    );
}
