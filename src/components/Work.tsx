import { useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData, Project } from "../data/portfolioData";
import { MdInfoOutline, MdClose, MdCheckCircle, MdOutlineSensors, MdOutlineSchedule } from "react-icons/md";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(() => {
    if (window.innerWidth <= 1024) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return;
      const container = document.querySelector(".work-container");
      if (!container || !box[0].parentElement) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2 || 40;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${Math.max(translateX, 400)}`,
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    const handleResize = () => {
      setTranslateX();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <section className="work-section" id="work" aria-label="Featured Projects">
      <div className="work-container section-container">
        <div className="work-header-wrap">
          <span className="work-header-badge">Featured Work</span>
          <h2>
            Featured <span>Projects</span>
          </h2>
          <p className="work-header-sub">
            Practical development projects focusing on disaster-response routing, mobility mapping, and interactive meeting interfaces.
          </p>
        </div>

        <div className="work-flex">
          {projects.map((project) => (
            <article className="work-box" key={project.id} aria-label={project.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div className="work-heading-group">
                    <div className="work-title-badge-row">
                      <h4>{project.title}</h4>
                      {project.badge && (
                        <span className="work-badge">{project.badge}</span>
                      )}
                    </div>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>

                {project.coreConcept && (
                  <div className="work-core-quote">
                    <span>"{project.coreConcept}"</span>
                  </div>
                )}

                <p className="work-description">{project.description}</p>

                <div className="work-tech-section">
                  <h5>Technologies Explored:</h5>
                  <div className="work-tags-container">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="work-tag-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="work-links-row">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="work-action-btn work-action-btn-primary"
                    data-cursor="disable"
                  >
                    <MdInfoOutline />
                    <span>View Details</span>
                  </button>
                  <span className="work-status-badge">
                    {project.status}
                  </span>
                </div>
              </div>

              <WorkImage
                image={project.image}
                alt={`${project.title} screenshot`}
                link=""
              />
            </article>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="project-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} Details`}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close details modal"
            >
              <MdClose />
            </button>

            <div className="project-modal-header">
              <span className="project-modal-number">{selectedProject.number}</span>
              <div>
                <h3>{selectedProject.title}</h3>
                <p className="project-modal-category">{selectedProject.category}</p>
              </div>
            </div>

            {selectedProject.coreConcept && (
              <div className="project-modal-concept">
                <span className="concept-label">Core Concept:</span>
                <blockquote>"{selectedProject.coreConcept}"</blockquote>
              </div>
            )}

            {selectedProject.problemStatement && (
              <div className="project-modal-box">
                <h4>SIH Context:</h4>
                <p>{selectedProject.problemStatement}</p>
              </div>
            )}

            <div className="project-modal-box">
              <h4>Project Overview:</h4>
              <p>{selectedProject.description}</p>
            </div>

            <div className="project-modal-box">
              <h4 className="implemented-header">
                <MdCheckCircle /> Implemented Capabilities:
              </h4>
              <ul className="project-feature-list">
                {selectedProject.implementedFeatures.map((feat, idx) => (
                  <li key={idx}>
                    <span className="feature-check" aria-hidden="true">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedProject.simulatedFeatures && selectedProject.simulatedFeatures.length > 0 && (
              <div className="project-modal-box project-modal-simulated">
                <h4 className="simulated-header">
                  <MdOutlineSensors /> Simulated Capabilities (Under Testing):
                </h4>
                <ul className="project-feature-list">
                  {selectedProject.simulatedFeatures.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feature-sim-dot" aria-hidden="true">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.plannedFeatures && selectedProject.plannedFeatures.length > 0 && (
              <div className="project-modal-box project-modal-planned">
                <h4 className="planned-header">
                  <MdOutlineSchedule /> Planned / Ongoing Enhancements:
                </h4>
                <ul className="project-feature-list">
                  {selectedProject.plannedFeatures.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feature-plan-dot" aria-hidden="true">→</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="project-modal-tech">
              <h4>Technologies & Stacks:</h4>
              <div className="work-tags-container">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="work-tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
