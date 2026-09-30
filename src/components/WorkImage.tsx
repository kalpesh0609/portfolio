import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      try {
        const response = await fetch(props.video);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideo(blobUrl);
      } catch (err) {
        console.warn("Could not load video preview", err);
      }
    }
  };

  const imageContent = (
    <div className="work-image-frame">
      <img src={props.image} alt={props.alt || "Project showcase screenshot"} loading="lazy" />
      {props.link && (
        <div className="work-link" aria-label="Open project demo">
          <MdArrowOutward />
        </div>
      )}
      {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
    </div>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
        >
          {imageContent}
        </a>
      ) : (
        <div
          className="work-image-in work-image-preview-only"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
        >
          {imageContent}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
