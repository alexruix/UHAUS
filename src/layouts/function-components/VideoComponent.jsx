import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import YouTube from "react-youtube";

const VideoComponent = ({
  height,
  width,
  src,
  title,
  video_id,
  video_height,
  video_width,
}) => {
  const [play, setPlay] = useState(false);
  const videoOptions = {
    borderRadius: 0,
    
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      {!play ? (
        <div className="relative text-center">
          <button className="video-play-btn" onClick={() => setPlay(true)}>
            <Play weight="fill" />
          </button>
          <img
            width={width}
            height={height}
            src={src}
            alt={title}
            className="inline h-auto max-w-full rounded-none"
          />
        </div>
      ) : (
        <div className="youtube mx-auto text-center rounded-none">
          <YouTube
            videoId={video_id}
            opts={videoOptions}
            iframeClassName={`  aspect-video ${video_height} ${video_width} max-w-full bg-transparent rounded-none`}
          />
        </div>
      )}
    </>
  );
};

export default VideoComponent;
