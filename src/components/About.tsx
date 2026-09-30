import { portfolioData } from "../data/portfolioData";
import { FaGraduationCap } from "react-icons/fa6";
import "./styles/About.css";

const About = () => {
  const { personal } = portfolioData;
  const { education } = personal;

  return (
    <section className="about-section" id="about" aria-label="About Me & Education">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {personal.about.paragraphs[0]}
        </p>
        <p className="about-secondary-para">
          {personal.about.paragraphs[1]}
        </p>

        <div className="about-education-card">
          <div className="education-icon-wrap" aria-hidden="true">
            <FaGraduationCap />
          </div>
          <div className="education-details">
            <div className="education-header-row">
              <h4 className="education-degree">{education.degree}</h4>
              <span className="education-status-pill">{education.status}</span>
            </div>
            <p className="education-branch">
              {education.branch} • <span className="education-year">{education.year}</span>
            </p>
          </div>
        </div>

        <div className="about-focus-container">
          <span className="about-focus-label">Core Exploration Areas</span>
          <div className="about-focus-tags">
            {personal.about.focusAreas.map((area, index) => (
              <span key={index} className="about-focus-pill">
                <span className="about-pill-dot" aria-hidden="true"></span>
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
