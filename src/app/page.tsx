"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setVideos } from "../features/videoSlice";
import { RootState, AppDispatch } from "../store/store";
import VideoPlayer from "../components/videoPlayer";
import NextVideo from "next-video";
import heroReel from "../../videos/scopeReel.mp4";
import logoIcon from "../images/LOGO_ICON.png";
gsap.registerPlugin(ScrollTrigger);

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
}

const fetchVideosQuery = async (userId: string): Promise<Video[]> => {
  const { data } = await axios.get(
    `https://take-home-assessment-423502.uc.r.appspot.com/videos?user_id=${userId}`
  );

  if (data && Array.isArray(data.videos)) {
    const uniqueUrls = new Set<string>();
    const filteredVideos = data.videos.filter((video: Video) => {
      if (video.video_url.includes("blob") || uniqueUrls.has(video.video_url)) {
        return false;
      }
      uniqueUrls.add(video.video_url);
      return true;
    });

    return filteredVideos;
  } else {
    console.error("API response is not as expected:", data);
    return [];
  }
};

const Home = () => {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const userId = "daniel_bogart";
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery<Video[], Error>(["videos", userId], () =>
    fetchVideosQuery(userId)
  );

  const videoList = useSelector((state: RootState) => state.videos.list);

  useEffect(() => {
    if (videos) {
      dispatch(setVideos(videos));
    }
  }, [videos, dispatch]);

  useEffect(() => {
    if (heroWrapperRef.current && videoList.length > 0) {
      console.log("heroWrapperRef.current:", heroWrapperRef.current);

      gsap.fromTo(
        heroWrapperRef.current,
        { y: -600 },
        {
          y: 0,
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    } else {
      console.error(
        "heroWrapperRef is not attached to any element or videoList is empty"
      );
    }
  }, [videoList]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10">Error loading videos</div>;

  if (!Array.isArray(videoList) || videoList.length === 0) {
    return <div className="text-center mt-10">No videos found</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex w-full h-[110vh] overflow-hidden rounded-custom items-center justify-center">
        <div className="absolute flex flex-col inset-0 flex items-center justify-center z-30">
          <Image
            src={logoIcon}
            alt="EdTech Logo Hero"
            width={100}
            height={100}
          />
          <h2 className="text-4xl font-semibold mix-blend-difference text-white">
            Scroll to explore
          </h2>
        </div>
        <div
          ref={heroWrapperRef}
          className="hero-wrapper h-[120vh] flex items-center justify-center w-full"
        >
          <NextVideo
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            src={heroReel}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Educational Videos</h1>
      <ul className="space-y-4">
        {videoList.map((video: Video) => (
          <li key={video.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
            <p className="text-gray-700 mb-2">{video.description}</p>
            <VideoPlayer url={video.video_url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
