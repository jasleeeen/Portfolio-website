import "./DomainReel.css";

import domains from "../../data/domains";

import Scene from "./Scene";

import EnterLab from "./EnterLab";

import useLenis from "../../hooks/useLenis";

export default function DomainReel() {

    useLenis();

    return (

        <>

            <EnterLab />

            <section
                id="domains"
                className="domain-reel"
            >

                <div className="domain-progress">

                    <span></span>

                </div>

                {domains.map((domain)=>(

                    <Scene
                        key={domain.id}
                        domain={domain}
                    />

                ))}

            </section>

        </>

    );

}