import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import TechCategories from "./TechCategories";
import Interests from "./Interests";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="container-main" role="main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <TechCategories />
            <Work />
            <Career />
            <Interests />
            {isDesktopView && (
              <Suspense fallback={<div className="tech-loading-fallback">Loading 3D Tech Stack...</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
