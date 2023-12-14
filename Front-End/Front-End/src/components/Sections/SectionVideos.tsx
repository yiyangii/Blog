import Heading from "components/Heading/Heading";
import NcPlayIcon from "components/NcPlayIcon/NcPlayIcon";
import NcPlayIcon2 from "components/NcPlayIcon2/NcPlayIcon2";
import React, { FC, Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import isSafariBrowser from "utils/isSafariBrowser";
import Image from "components/Image";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "iItiK76LJPY",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcdo.mit.edu%2Fblog%2F2021%2F01%2F26%2Fnew-technical-interview-tool-leetcode%2F&psig=AOvVaw1FexODShGFN7aJFjeaXByw&ust=1701924270181000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCjoI6A-oIDFQAAAAAdAAAAABAE",
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];

    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden 
        border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
        title={video.title}
      >
        {isSafariBrowser() ? (
          <Fragment>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=8wysIxzqgPI`}
              style={{
                opacity: isPlay ? 1 : 0,
                display: isPlay ? "block" : "none",
              }}
              playing={isPlay}
              controls
              width="100%"
              height="100%"
            />
            {!isPlay && (
              <Fragment>
                <div
                  onClick={() => setIsPlay(true)}
                  className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                >
                  <NcPlayIcon />
                </div>
                <Image
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                  src={video.thumbnail}
                  title={video.title}
                  alt={video.title}
                  fill
                  sizes="(max-width: 600px) 480px, 800px"
                />
              </Fragment>
            )}
          </Fragment>
        ) : (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=8wysIxzqgPI`}
            playing={true}
            controls
            width="100%"
            height="100%"
            light={video.thumbnail}
            playIcon={<NcPlayIcon />}
          />
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    return (
      <div
        className="group relative aspect-h-16 aspect-w-16 rounded-2xl cursor-pointer overflow-hidden sm:aspect-h-12 sm:rounded-3xl lg:aspect-h-9 z-0"
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <NcPlayIcon2 />
        </div>
        <Image
          sizes="(max-width: 600px) 480px, 800px"
          className="object-cover transition-transform group-hover:scale-110 duration-300"
          src={video.thumbnail}
          fill
          title={video.title}
          alt={video.title}
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Video Component Build
          ."
      >
        🎬 The Videos
      </Heading>

      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {isRendered && renderMainVideo()}
        </div>
        <div className="flex-shrink-0 grid gap-2 grid-cols-4 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40">
          {isRendered && videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
