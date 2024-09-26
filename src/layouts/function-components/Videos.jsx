import { useState } from "react";
import { Play } from "@phosphor-icons/react";

const Videos = ({
  height,
  width,
  src,
  title,
  video_path, // Nueva propiedad para el video local
  video_height,
  video_width,
}) => {
  const [play, setPlay] = useState(false);

  return (
    <>
      {!play ? (
        <div className="relative text-center">
          <button className="video-play-btn" onClick={() => setPlay(true)} aria-label="Reproducir video">
            <Play weight="fill" />
          </button>
          <img
            width={width}
            height={height}
            src={src}
            alt={title}
            className="inline max-w-full object-cover max-h-52"
          />
        </div>
      ) : (
        <div className="mx-auto text-center">
          <video
            src={video_path}  
            width={width}
            height={height}
            // controls
            autoPlay
            className="max-w-full object-cover rounded-none"
          >
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      )}
    </>
  );
};

export default Videos;
