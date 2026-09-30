import { portfolioData } from "../data/portfolioData";
import {
  FaGlobe,
  FaLayerGroup,
  FaMobileScreen,
  FaAndroid,
  FaServer,
  FaCube,
  FaPalette,
  FaLightbulb,
  FaCodeBranch,
} from "react-icons/fa6";
import "./styles/Interests.css";

const interestIcons: Record<string, React.ReactNode> = {
  "Web Development": <FaGlobe />,
  "Full-Stack Development": <FaLayerGroup />,
  "Flutter Development": <FaMobileScreen />,
  "Android Development": <FaAndroid />,
  "Backend Development": <FaServer />,
  "3D Web Design": <FaCube />,
  "UI/UX Design": <FaPalette />,
  "Problem Solving": <FaLightbulb />,
  "Open-Source Projects": <FaCodeBranch />,
};

const Interests = () => {
  const { interests } = portfolioData;

  return (
    <section className="interests-section section-container" id="interests" aria-label="Technical Interests & Focus Areas">
      <div className="interests-header">
        <span className="interests-badge">Areas of Interest</span>
        <h2>
          What I'm <span>Passionate</span> About
        </h2>
        <p className="interests-intro">
          Core technical domains, development frameworks, and engineering disciplines that I actively explore and study.
        </p>
      </div>

      <div className="interests-grid">
        {interests.map((item, idx) => {
          const icon = interestIcons[item.title] || <FaGlobe />;
          return (
            <div className="interest-card" key={idx}>
              <div className="interest-icon-wrap" aria-hidden="true">
                {icon}
              </div>
              <div className="interest-card-body">
                <span className="interest-pill-cat">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Interests;
