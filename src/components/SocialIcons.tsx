import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { portfolioData } from "../data/portfolioData";

const SocialIcons = () => {
  const { social } = portfolioData;

  useEffect(() => {
    const socialElem = document.getElementById("social") as HTMLElement;
    if (!socialElem) return;

    const items = socialElem.querySelectorAll("span");
    const cleanupFns: (() => void)[] = [];

    items.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let animFrameId: number;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animFrameId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      animFrameId = requestAnimationFrame(updatePosition);

      cleanupFns.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animFrameId);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <aside className="icons-section" aria-label="Social and Profile Links">
      <div className="social-icons" data-cursor="icons" id="social">
        {social.github && (
          <span>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kalpesh's GitHub Profile"
            >
              <FaGithub />
            </a>
          </span>
        )}
        {social.linkedin && (
          <span>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kalpesh's LinkedIn Profile"
            >
              <FaLinkedinIn />
            </a>
          </span>
        )}
        {social.twitter && (
          <span>
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kalpesh's Twitter / X Profile"
            >
              <FaXTwitter />
            </a>
          </span>
        )}
        {social.instagram && (
          <span>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kalpesh's Instagram Profile"
            >
              <FaInstagram />
            </a>
          </span>
        )}
      </div>

      {social.resumeUrl ? (
        <a
          className="resume-button"
          href={social.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume PDF"
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      ) : null}
    </aside>
  );
};

export default SocialIcons;
