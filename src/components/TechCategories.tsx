import { portfolioData } from "../data/portfolioData";
import {
  FaCode,
  FaGlobe,
  FaMobileScreenButton,
  FaDatabase,
  FaWrench,
  FaCube,
} from "react-icons/fa6";
import "./styles/TechCategories.css";

const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend Development": <FaGlobe />,
  "Backend Development": <FaDatabase />,
  "Mobile App Development": <FaMobileScreenButton />,
  "Programming Languages": <FaCode />,
  "UI/UX and 3D Web": <FaCube />,
  "Developer Tools": <FaWrench />,
};

const TechCategories = () => {
  const { skillCategories } = portfolioData;

  return (
    <section className="tech-categories-section section-container" id="skills" aria-label="Skills and Technologies">
      <div className="tech-cat-header">
        <span className="tech-cat-badge">Technical Repertoire</span>
        <h2>
          Skills & <span>Technologies</span>
        </h2>
        <p className="tech-cat-intro">
          An organized view of development domains, programming languages, and tools explored through hands-on application engineering.
        </p>
      </div>

      <div className="tech-cat-grid">
        {skillCategories.map((cat, idx) => {
          const icon = categoryIcons[cat.name] || <FaCode />;
          return (
            <div className="tech-cat-card" key={idx}>
              <div className="tech-cat-card-header">
                <div className="tech-cat-icon" aria-hidden="true">
                  {icon}
                </div>
                <h3>{cat.name}</h3>
              </div>
              <ul className="tech-cat-skills-list" aria-label={`${cat.name} skills`}>
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="tech-cat-skill-item">
                    <span className="tech-skill-bullet" aria-hidden="true"></span>
                    <span className="tech-skill-name">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechCategories;
