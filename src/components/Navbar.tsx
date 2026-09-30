import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { portfolioData } from "../data/portfolioData";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024 && smoother) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section, true, "top top");
          }
        }
      });
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { personal, social } = portfolioData;

  return (
    <>
      <header className="header" role="banner">
        <a href="#landingDiv" className="navbar-title" data-cursor="disable" aria-label="Developer Portfolio Home">
          <span className="navbar-title-kr">{personal.brandTitle}</span>
          <span className="navbar-title-dot">.</span>
          <span className="navbar-title-sub">{personal.brandSub}</span>
        </a>

        {social.email && (
          <a
            href={`mailto:${social.email}`}
            className="navbar-connect"
            data-cursor="disable"
            aria-label={`Send email to ${social.email}`}
          >
            <span className="navbar-connect-indicator"></span>
            {social.email}
          </a>
        )}

        <nav aria-label="Main Navigation">
          <ul>
            <li>
              <a data-href="#landingDiv" href="#landingDiv" aria-label="Navigate to Home section">
                <HoverLinks text="HOME" />
              </a>
            </li>
            <li>
              <a data-href="#about" href="#about" aria-label="Navigate to About section">
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#skills" href="#skills" aria-label="Navigate to Skills section">
                <HoverLinks text="SKILLS" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work" aria-label="Navigate to Projects section">
                <HoverLinks text="PROJECTS" />
              </a>
            </li>
            <li>
              <a data-href="#journey" href="#journey" aria-label="Navigate to Journey section">
                <HoverLinks text="JOURNEY" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact" aria-label="Navigate to Contact section">
                <HoverLinks text="CONTACT" />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing-circle1" aria-hidden="true"></div>
      <div className="landing-circle2" aria-hidden="true"></div>
      <div className="nav-fade" aria-hidden="true"></div>
    </>
  );
};

export default Navbar;
