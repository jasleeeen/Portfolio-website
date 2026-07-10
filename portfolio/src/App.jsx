import { useEffect, useState } from "react";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/utilities.css";
import "./styles/konami.css";

import Loader from "./components/Loader/Loader";

import Cursor from "./components/Cursor/Cursor";
import CursorTrail from "./components/Cursor/CursorTrail";

import DeveloperConsole from "./components/DeveloperConsole/DeveloperConsole";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import Konami from "./components/EasterEgg/Konami";

import ThemeController from "./components/UI/ThemeController";
import PerformanceMode from "./components/UI/PerformanceMode";

import GridGlow from "./components/Background/GridGlow";
import MorphBackground from "./components/UI/MorphBackground";
import PageGrid from "./components/UI/PageGrid";
import AmbientLight from "./components/UI/AmbientLight";
import PageBlur from "./components/UI/PageBlur";
import NoiseOverlay from "./components/UI/NoiseOverlay";
import FloatingOrbs from "./components/UI/FloatingOrbs";
import Spotlight from "./components/UI/Spotlight";
import FadeMask from "./components/UI/FadeMask";
import Vignette from "./components/UI/Vignette";
import ScanLines from "./components/UI/ScanLines";

import GradientBorder from "./components/UI/GradientBorder";
import CornerAccent from "./components/UI/CornerAccent";
import FocusRing from "./components/UI/FocusRing";
import CinematicOverlay from "./components/UI/CinematicOverlay";

import LoadingBar from "./components/UI/LoadingBar";

import AIHud from "./components/HUD/AIHud";
import HUDProgress from "./components/HUD/HUDProgress";
import FPSCounter from "./components/HUD/FPSCounter";
import PerformanceMonitor from "./components/Performance/PerformanceMonitor";
import DeviceStatus from "./components/HUD/DeviceStatus";
import NetworkStatus from "./components/Status/NetworkStatus";
import PageStatus from "./components/HUD/PageStatus";
import Viewport from "./components/HUD/Viewport";
import ScrollDirection from "./components/UI/ScrollDirection";
import CurrentSection from "./components/HUD/CurrentSection";
import SystemClock from "./components/HUD/SystemClock";
import SystemStats from "./components/Assistant/SystemStats";
import IdleStatus from "./components/HUD/IdleStatus";

import AssistantOrb from "./components/Assistant/AssistantOrb";

import Navigation from "./components/Navigation/Navigation";

import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import TechMarquee from "./components/Marquee/TechMarquee";
import DomainReel from "./components/Domains/DomainReel";
import Quote from "./components/Quote/Quote";
import Projects from "./components/Projects/Projects";
import GitHubStats from "./components/GitHubStats/GitHubStats";
import Skills from "./components/Skills/Skills";
import Certificates from "./components/Certificates/Certificates";
import Achievements from "./components/Achievements/Achievements";
import Timeline from "./components/Timeline/Timeline";
import Availability from "./components/Availability/Availability";
import Contact from "./components/Contact/Contact";
import Shutdown from "./components/Shutdown/Shutdown";

import SectionTransition from "./components/UI/SectionTransition";

import ScrollToBottom from "./components/UI/ScrollToBottom";
import BackToTop from "./components/UI/BackToTop";
import SectionDots from "./components/UI/SectionDots";
import VersionBadge from "./components/UI/VersionBadge";

import Footer from "./components/Footer/Footer";

import PageTransition from "./components/UI/PageTransition";
import MobileNotice from "./components/UI/MobileNotice";
import CustomSelection from "./components/UI/CustomSelection";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-shell">

      <LoadingBar />

      <GridGlow />
      <MorphBackground />
      <PageGrid />
      <AmbientLight />
      <PageBlur />
      <FadeMask />
      <NoiseOverlay />
      <FloatingOrbs />
      <Spotlight />
      <Vignette />
      <ScanLines />

      <Cursor />
      <CursorTrail />

      <DeveloperConsole />
      <CommandPalette />
      <ThemeController />
      <PerformanceMode />
      <Konami />

      <GradientBorder />
      <CornerAccent />
      <FocusRing />
      <CinematicOverlay />
      <CustomSelection />

      <AIHud />
      <HUDProgress />
      <FPSCounter />
      <PerformanceMonitor />
      <DeviceStatus />
      <NetworkStatus />
      <PageStatus />
      <Viewport />
      <ScrollDirection />
      <CurrentSection />
      <SystemClock />
      <SystemStats />
      <IdleStatus />

      <AssistantOrb />

      <Navigation />

      <SectionDots />

      <MobileNotice />

      <PageTransition>

        <main>

          <Hero />
          <SectionTransition />

          <About />
          <SectionTransition />

          <TechMarquee />
          <SectionTransition />

          <DomainReel />
          <SectionTransition />

          <Quote />
          <SectionTransition />

          <Projects />
          <SectionTransition />

          <GitHubStats />
          <SectionTransition />

          <Skills />
          <SectionTransition />

          <Certificates />
          <SectionTransition />

          <Achievements />
          <SectionTransition />

          <Timeline />
          <SectionTransition />

          <Availability />
          <SectionTransition />

          <Contact />

          <Shutdown />

        </main>

      </PageTransition>

      <VersionBadge />

      <ScrollToBottom />

      <BackToTop />

      <Footer />

    </div>
  );
}