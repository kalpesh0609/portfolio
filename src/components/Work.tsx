import { useState, useEffect } from "react";
import "./styles/Work.css";
import { portfolioData, Project } from "../data/portfolioData";
import {
  MdInfoOutline,
  MdClose,
  MdCheckCircle,
  MdOutlineSensors,
  MdOutlineSchedule,
  MdChevronLeft,
  MdChevronRight,
  MdZoomIn,
} from "react-icons/md";

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  onOpenLightbox: (project: Project, index: number) => void;
}

const ProjectCard = ({ project, onOpenDetails, onOpenLightbox }: ProjectCardProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const screenshots =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [{ url: project.image, caption: project.title }];

  const currentScreenshot = screenshots[activeImageIndex] || screenshots[0];

  return (
    <article className="project-card" aria-label={project.title}>
      {/* 1. Project Screenshot Gallery */}
      <div className="project-gallery-wrap">
        <div
          className="project-main-image-container"
          onClick={() => onOpenLightbox(project, activeImageIndex)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenLightbox(project, activeImageIndex);
            }
          }}
          aria-label={`Enlarge ${project.title} screenshot`}
        >
          <img
            src={currentScreenshot.url}
            alt={currentScreenshot.caption || `${project.title} screenshot`}
            className="project-main-image"
            loading="lazy"
          />
          <div className="project-image-zoom-badge" aria-hidden="true">
            <MdZoomIn />
            <span>Click to enlarge</span>
          </div>
        </div>

        {screenshots.length > 1 && (
          <div
            className="project-thumbnails-gallery"
            role="tablist"
            aria-label={`${project.title} screenshot gallery`}
          >
            {screenshots.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`project-thumbnail-btn ${
                  idx === activeImageIndex ? "active" : ""
                }`}
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`View screenshot ${idx + 1}: ${
                  s.caption || project.title
                }`}
                aria-selected={idx === activeImageIndex}
                role="tab"
              >
                <img src={s.url} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Card Content */}
      <div className="project-card-body">
        <div className="project-meta-row">
          <span className="project-number">{project.number}</span>
          <div className="project-heading-block">
            <div className="project-title-badge-row">
              <h3 className="project-title">{project.title}</h3>
              {project.badge && (
                <span className="project-badge">{project.badge}</span>
              )}
            </div>
            <span className="project-category">{project.category}</span>
          </div>
        </div>

        {project.coreConcept && (
          <div className="project-core-concept">
            <span>"{project.coreConcept}"</span>
          </div>
        )}

        <p className="project-description">{project.description}</p>

        <div className="project-tech-block">
          <span className="project-tech-label">Technologies:</span>
          <div className="work-tags-container">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="work-tag-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Card Footer */}
      <div className="project-card-footer">
        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          className="project-action-btn project-action-btn-primary"
          data-cursor="disable"
        >
          <MdInfoOutline />
          <span>View Details</span>
        </button>
        <span className="project-status-badge">{project.status}</span>
      </div>
    </article>
  );
};

interface LightboxState {
  project: Project;
  index: number;
}

const Work = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const currentLightboxScreenshots =
    lightbox && lightbox.project.screenshots && lightbox.project.screenshots.length > 0
      ? lightbox.project.screenshots
      : lightbox
      ? [{ url: lightbox.project.image, caption: lightbox.project.title }]
      : [];

  const handleLightboxPrev = () => {
    if (!lightbox || currentLightboxScreenshots.length <= 1) return;
    setLightbox((prev) => {
      if (!prev) return null;
      const prevIndex =
        (prev.index - 1 + currentLightboxScreenshots.length) %
        currentLightboxScreenshots.length;
      return { ...prev, index: prevIndex };
    });
  };

  const handleLightboxNext = () => {
    if (!lightbox || currentLightboxScreenshots.length <= 1) return;
    setLightbox((prev) => {
      if (!prev) return null;
      const nextIndex = (prev.index + 1) % currentLightboxScreenshots.length;
      return { ...prev, index: nextIndex };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) {
          setLightbox(null);
        } else if (selectedProject) {
          setSelectedProject(null);
        }
      } else if (lightbox && currentLightboxScreenshots.length > 1) {
        if (e.key === "ArrowLeft") {
          handleLightboxPrev();
        } else if (e.key === "ArrowRight") {
          handleLightboxNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, selectedProject, currentLightboxScreenshots.length]);

  return (
    <section className="work-section section-container" id="work" aria-label="My Projects">
      {/* 1. Centered Section Heading */}
      <div className="work-header-wrap">
        <span className="work-header-badge">Featured Work</span>
        <h2>
          My <span>Projects</span>
        </h2>
        <p className="work-header-sub">
          A collection of applications I've designed and developed.
        </p>
      </div>

      {/* 2. Systematic Project Cards Grid */}
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={setSelectedProject}
            onOpenLightbox={(proj, idx) => setLightbox({ project: proj, index: idx })}
          />
        ))}
      </div>

      {/* 3. Enlarged Screenshot Lightbox Modal */}
      {lightbox && currentLightboxScreenshots.length > 0 && (
        <div
          className="screenshot-lightbox-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.project.title} Screenshot Preview`}
        >
          <div
            className="screenshot-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightbox(null)}
              aria-label="Close enlarged preview"
            >
              <MdClose />
            </button>

            <div className="lightbox-image-wrap">
              <img
                src={currentLightboxScreenshots[lightbox.index]?.url}
                alt={
                  currentLightboxScreenshots[lightbox.index]?.caption ||
                  `${lightbox.project.title} enlarged screenshot`
                }
                className="lightbox-main-img"
              />

              {currentLightboxScreenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-nav-btn lightbox-prev-btn"
                    onClick={handleLightboxPrev}
                    aria-label="Previous screenshot"
                  >
                    <MdChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav-btn lightbox-next-btn"
                    onClick={handleLightboxNext}
                    aria-label="Next screenshot"
                  >
                    <MdChevronRight />
                  </button>
                </>
              )}
            </div>

            <div className="lightbox-footer">
              <div className="lightbox-caption">
                <h4>{lightbox.project.title}</h4>
                {currentLightboxScreenshots[lightbox.index]?.caption && (
                  <p>{currentLightboxScreenshots[lightbox.index].caption}</p>
                )}
              </div>
              {currentLightboxScreenshots.length > 1 && (
                <span className="lightbox-counter">
                  {lightbox.index + 1} / {currentLightboxScreenshots.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Project Details In-Depth Modal */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} Details`}
        >
          <div
            className="project-modal-card"
            onClick={(e) => e.stopPropagation()}
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
              <span className="project-modal-number">
                {selectedProject.number}
              </span>
              <div>
                <h3>{selectedProject.title}</h3>
                <p className="project-modal-category">
                  {selectedProject.category}
                </p>
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
                    <span className="feature-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedProject.simulatedFeatures &&
              selectedProject.simulatedFeatures.length > 0 && (
                <div className="project-modal-box project-modal-simulated">
                  <h4 className="simulated-header">
                    <MdOutlineSensors /> Simulated Capabilities (Under Testing):
                  </h4>
                  <ul className="project-feature-list">
                    {selectedProject.simulatedFeatures.map((feat, idx) => (
                      <li key={idx}>
                        <span className="feature-sim-dot" aria-hidden="true">
                          •
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedProject.plannedFeatures &&
              selectedProject.plannedFeatures.length > 0 && (
                <div className="project-modal-box project-modal-planned">
                  <h4 className="planned-header">
                    <MdOutlineSchedule /> Planned / Ongoing Enhancements:
                  </h4>
                  <ul className="project-feature-list">
                    {selectedProject.plannedFeatures.map((feat, idx) => (
                      <li key={idx}>
                        <span className="feature-plan-dot" aria-hidden="true">
                          →
                        </span>
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
