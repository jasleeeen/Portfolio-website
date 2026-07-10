import "./Hero.css";
import "./FloatingPanels.css";
import HeroContent from "./HeroContent";
import HeroBackground from "./HeroBackground";
import FloatingPanels from "./FloatingPanels";

export default function Hero() {
  return (
    <section className="hero" id="top">

      {/* animated workspace */}
      <HeroBackground />

      {/* floating holographic windows */}
      <FloatingPanels />

      {/* glass content */}
      <HeroContent />

      {/* vignette */}
      <div className="hero-vignette"></div>

      {/* gradient fade */}
      <div className="hero-bottom-fade"></div>

    </section>
  );
}