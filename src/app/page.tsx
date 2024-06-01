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
import NextVideo from "next-video";
import heroReel from "../../videos/scopeReel.mp4";
import logoIcon from "../../public/images/LOGO_ICON.png";
import { getThumbnailUrl } from "../lib/getThumbNailUrl";
import { truncateText } from "@/lib/charHelpers";
import Link from "next/link";
import snowyMountain from "../../public/images/snowyMountain.jpg";
import climbing from "../../public/images/climbing.jpg";
import mountaineering from "../../public/images/mountaineering.jpg";
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
    const sortedVideos = filteredVideos.sort((a: Video, b: Video) =>
      a.id < b.id ? 1 : -1
    );
    return sortedVideos.slice(0, 6);
  } else {
    console.error("API response is not as expected:", data);
    return [];
  }
};

const Home = () => {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const snowyRef = useRef<HTMLDivElement>(null);
  const climbingRef = useRef<HTMLDivElement>(null);
  const mountaineeringRef = useRef<HTMLDivElement>(null);
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

      gsap.fromTo(
        snowyRef.current,
        { y: -200 },
        {
          y: 0,
          scrollTrigger: {
            trigger: snowyRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );

      gsap.fromTo(
        climbingRef.current,
        { y: -200 },
        {
          y: 0,
          scrollTrigger: {
            trigger: climbingRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );

      gsap.fromTo(
        mountaineeringRef.current,
        { y: -200 },
        {
          y: 0,
          scrollTrigger: {
            trigger: mountaineeringRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [videoList]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10">Error loading videos</div>;

  if (!Array.isArray(videoList) || videoList.length === 0) {
    return <div className="text-center mt-10">No videos found</div>;
  }

  return (
    <div className="w-full flex flex-col items-start justify-start overflow-hidden bg-black">
      <section className="relative flex w-full h-[110vh] overflow-hidden rounded-custom items-start justify-start bg-black">
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
          className="brightness-80 rounded-custom hero-wrapper h-[120vh] flex items-start justify-start w-full"
        >
          <NextVideo
            className="rounded-custom h-[120vh] w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            src={heroReel}
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center py-32 px-10">
          <h1 className="text-9xl font-light mb-4 text-white pb-10">
            Featured Videos
          </h1>
          <ul className="grid grid-cols-3 gap-2 w-full">
            {videoList.map((video: Video) => (
              <li
                key={video.id}
                className="group w-full gap-1.5 flex flex-col transform transition-all duration-300 ease-out brightness-80 hover:brightness-100"
              >
                <Link
                  className="w-full gap-1.5 flex flex-col"
                  href={`/videos/${video.id}`}
                >
                  <div className="overflow-hidden w-full flex items-center justify-center h-[268px] cursor-pointer">
                    <Image
                      src={getThumbnailUrl(video.video_url)}
                      alt={`${video.title} thumbnail`}
                      width={564}
                      height={317}
                      className="rounded-lg transform group-hover:scale-105 transition-all duration-300 ease-out"
                    />
                  </div>
                  <Image
                    src={logoIcon}
                    width={24}
                    height={24}
                    alt="EdTech Logo Small"
                  />
                  <div className="relative">
                    <span className="absolute left-0 block h-[2px] w-0 bg-white transform transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="w-full h-[1px] brightness-50 absolute bg-white" />
                  </div>
                  <h2 className="text-lg mb-2 text-white font-light">
                    {truncateText(video.title, 50)}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center py-32 px-10">
          <h1 className="text-9xl font-light mb-4 text-white pb-10 max-w-[57rem]">
            Reaching New Summits
          </h1>
          <div className="flex gap-[2rem] w-full">
            <p className="text-md mb-2 text-white font-extralight max-w-xl leading-relaxed">
              LearnMore’s series on mountain exploration for outdoor enthusiasts
              has garnered international acclaim for its groundbreaking approach
              to capturing the essence of rock climbing and mountaineering. Our
              series have been recognized for their exceptional cinematography,
              immersive audio, and stunning special effects. At the prestigious
              Outdoor Adventure Awards, our series have been celebrated for Best
              Adventure Documentary and Best Technical Achievement.
            </p>
            <div className="overflow-hidden">
              <div ref={mountaineeringRef} className="h-[470px]">
                <Image
                  width={1000}
                  height={600}
                  alt="mountaineering"
                  src={mountaineering}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center py-32 px-10">
          <h1 className="text-9xl font-light mb-4 text-white pb-10 max-w-[57rem] text-end self-end">
            A Journey Like No Other
          </h1>
          <div className="flex gap-[2rem] w-full">
            <div className="overflow-hidden">
              <div ref={snowyRef} className="h-[470px]">
                <Image
                  width={1000}
                  height={600}
                  alt="Snowy Mountain"
                  src={snowyMountain}
                />
              </div>
            </div>
            <p className="text-md mb-2 text-white font-extralight max-w-xl leading-relaxed">
              Our team is the cornerstone of LearnMore's success. We deeply
              value the dedication and passion that our team members bring to
              every project. By fostering an environment of creativity, freedom
              of expression, and inclusivity, we aim to bring out the best in
              each member of our exceptional and committed team.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center py-32 px-10">
          <h1 className="text-9xl font-light mb-4 text-white pb-10 max-w-[57rem]">
            Explore. Learn. Achieve.
          </h1>
          <div className="flex gap-[2rem] w-full">
            <p className="text-md mb-2 text-white font-extralight max-w-xl leading-relaxed">
              At LearnMore, we believe in the power of education and adventure.
              Our comprehensive library of educational videos covers everything
              from beginner rock climbing techniques to advanced mountaineering
              expeditions. Join us on a journey to discover the wonders of the
              vertical world and equip yourself with the knowledge and skills to
              reach new heights.
            </p>
            <div className="overflow-hidden">
              <div ref={climbingRef} className="h-[470px]">
                <Image
                  width={1000}
                  height={600}
                  alt="Climbing"
                  src={climbing}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
