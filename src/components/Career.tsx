import { portfolioData } from "../data/portfolioData";
import "./styles/Career.css";

const Career = () => {
  const { journey } = portfolioData;

  return (
    <section className="career-section section-container" id="journey" aria-label="My Development Journey">
      <div className="career-container">
        <h2>
          My <span>Journey</span>
          <br /> & Milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline" aria-hidden="true">
            <div className="career-dot"></div>
          </div>

          {journey.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.title}</h4>
                  <h5>{item.subtitle}</h5>
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="journey-highlights">
                      {item.highlights.map((h, hIdx) => (
                        <span key={hIdx} className="journey-tag">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h3>{item.period}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
