import "./DomainReel.css";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import domains from "../../data/domains";

import Scene from "./Scene";

import EnterLab from "./EnterLab";

import useLenis from "../../hooks/useLenis";

export default function DomainReel() {

    useLenis();

    const reelRef = useRef(null);

    // real progress through the domains section
    const { scrollYProgress } = useScroll({
        target: reelRef,
        offset: ["start 0.7", "end 0.7"],
    });

    // the rail only shows while you're actually inside the section
    const railOpacity = useTransform(
        scrollYProgress,
        [0, 0.03, 0.97, 1],
        [0, 1, 1, 0]
    );

    return (

        <>

            <EnterLab />

            <section
                id="domains"
                className="domain-reel"
                ref={reelRef}
            >

                <motion.div
                    className="domain-progress"
                    style={{ opacity: railOpacity }}
                >

                    <motion.span style={{ scaleY: scrollYProgress }}></motion.span>

                </motion.div>

                {domains.map((domain, index)=>(

                    <Scene
                        key={domain.id}
                        domain={domain}
                        index={index}
                    />

                ))}

            </section>

        </>

    );

}
