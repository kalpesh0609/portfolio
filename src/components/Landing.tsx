import { PropsWithChildren } from "react";
import { portfolioData } from "../data/portfolioData";
import { smoother } from "./Navbar";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { personal } = portfolioData;

  const handleScrollToWork = (e: React.MouseEvent) => {
    if (window.innerWidth > 1024 && smoother) {
      e.preventDefault();
      smoother.scrollTo("#work", true, "top top");
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    if (window.innerWidth > 1024 && smoother) {
      e.preventDefault();
      smoother.scrollTo("#contact", true, "top top");
    }
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    if (window.innerWidth > 1024 && smoother) {
      e.preventDefault();
      smoother.scrollTo("#about", true, "top top");
    }
  };

  return (
    <>
      <section className="landing-section" id="landingDiv" aria-label="Introduction">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm a</h2>
            <h1>
              FULL-STACK
              <br />
              <span>DEVELOPER</span>
            </h1>
            <p className="landing-tagline">
              {personal.heroHeading}
            </p>
          </div>

          <div className="landing-info">
            <h3>Passionate</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Software</div>
              <div className="landing-h2-2">Full-Stack</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>

            <p className="landing-short-intro">
              {personal.heroIntro}
            </p>

            <div className="landing-cta-group">
              <a
                href="#work"
                onClick={handleScrollToWork}
                className="landing-cta-btn"
                data-cursor="disable"
              >
                <span>View My Work</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="landing-secondary-btn"
                data-cursor="disable"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div
            className="hero-scroll-indicator"
            onClick={handleScrollToAbout}
            data-cursor="disable"
            role="button"
            tabIndex={0}
            aria-label="Scroll down to About section"
          >
            <div className="scroll-indicator-mouse">
              <div className="scroll-indicator-wheel"></div>
            </div>
            <span className="scroll-indicator-text">Scroll to explore</span>
          </div>
        </div>
        {children}
      </section>
    </>
  );
};

export default Landing;
