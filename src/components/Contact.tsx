import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdContentCopy, MdCheck } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { portfolioData } from "../data/portfolioData";
import "./styles/Contact.css";

const Contact = () => {
  const { personal, social } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleCopyEmail = () => {
    if (social.email) {
      navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!social.email) return;

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formName || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    );
    window.location.href = `mailto:${social.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section section-container" id="contact" aria-label="Contact Section">
      <div className="contact-container">
        <div className="contact-header-wrap">
          <span className="contact-subtitle">Get in Touch</span>
          <h3>Let's <span>Connect</span></h3>
          <p className="contact-invitation">
            I am always open to exploring new technologies, software engineering collaborations, and opportunities to build impactful applications.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-column">
            <div className="contact-card">
              <h4>Direct Email</h4>
              <div className="contact-email-row">
                <a
                  href={`mailto:${social.email}`}
                  data-cursor="disable"
                  className="contact-email-link"
                >
                  {social.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="contact-copy-btn"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <MdCheck /> : <MdContentCopy />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="contact-card">
              <h4>Professional Profiles</h4>
              <div className="contact-social-links">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    className="contact-social-item"
                  >
                    <span className="contact-social-icon"><FaGithub /></span>
                    <span>GitHub</span>
                    <MdArrowOutward className="contact-arrow" />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    className="contact-social-item"
                  >
                    <span className="contact-social-icon"><FaLinkedinIn /></span>
                    <span>LinkedIn</span>
                    <MdArrowOutward className="contact-arrow" />
                  </a>
                )}
              </div>
            </div>

            <div className="contact-attribution-card">
              <h2>
                Crafted with care <br />
                <span>Developer Portfolio</span>
              </h2>
              <p className="contact-role-sub">{personal.headline}</p>
              <h5>
                <MdCopyright /> {new Date().getFullYear()} Developer Portfolio. All rights reserved.
              </h5>
            </div>
          </div>

          <div className="contact-form-column">
            <form className="contact-form" onSubmit={handleSendMessage}>
              <h4>Send a Direct Message</h4>
              <p className="contact-form-note">
                Opens your default email client with your message pre-filled directly to {social.email}.
              </p>

              <div className="contact-input-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>

              <div className="contact-input-group">
                <label htmlFor="contact-msg">Message</label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  placeholder="Tell me about your project, idea, or inquiry..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="contact-submit-btn" data-cursor="disable">
                <span>Send Message via Email</span>
                <MdArrowOutward aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
