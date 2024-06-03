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
import BackgroundVideo from "next-video/background-video";
import heroReel from "../../videos/scopeReel.mp4";
import logoIcon from "../../public/images/LOGO_ICON.png";
import { getThumbnailUrl } from "../lib/getThumbNailUrl";
import { truncateText } from "@/lib/charHelpers";
import Link from "next/link";
import snowyMountain from "../../public/images/snowyMountain.jpg";
import climbing from "../../public/images/climbing.jpg";
import mountaineering from "../../public/images/mountaineering.jpg";
import { useCheckScreenSize } from "@/lib/checkScreenSize";
import CTA from "../components/button";
gsap.registerPlugin(ScrollTrigger);

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
}

const Home = () => {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const snowyRef = useRef<HTMLDivElement>(null);
  const climbingRef = useRef<HTMLDivElement>(null);
  const mountaineeringRef = useRef<HTMLDivElement>(null);
  const userId = "daniel_bogart";
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useCheckScreenSize(768);

  const fetchVideosQuery = async (userId: string): Promise<Video[]> => {
    const { data } = await axios.get(
      `https://take-home-assessment-423502.uc.r.appspot.com/videos?user_id=${userId}`
    );

    const recentVideoNumber = isMobile ? 2 : 6;

    console.log("data", data);

    if (data && Array.isArray(data.videos)) {
      const uniqueUrls = new Set<string>();
      const filteredVideos = data.videos.filter((video: Video) => {
        const videoUrl = video.video_url.toLowerCase();
        if (
          uniqueUrls.has(video.video_url) ||
          !(videoUrl.includes("youtube") || videoUrl.includes("vimeo"))
        ) {
          return false;
        }
        uniqueUrls.add(video.video_url);
        return true;
      });
      const sortedVideos = filteredVideos.sort((a: Video, b: Video) =>
        a.id < b.id ? 1 : -1
      );

      console.log("sortedVideos", sortedVideos);
      return sortedVideos.slice(0, recentVideoNumber);
    } else {
      console.error("API response is not as expected:", data);
      return [];
    }
  };
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
    const yShift = isMobile ? -100 : -200;
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
        { y: yShift },
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
        { y: yShift },
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
        { y: yShift },
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
        <div className="absolute flex flex-col inset-0 flex items-center justify-center z-30 gap-10 px-5">
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-2xl font- mix-blend-difference text-white text-center max-w-screen-xl">
              Your gateway to mastering new skills and embarking on breathtaking
              journeys.
            </h1>
            <div className="flex sm:flex-row flex-col items-center justify-center gap-8">
              <CTA to="/create">Contribute</CTA>
              <CTA theme="orange" to="/create">
                Browse all
              </CTA>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mix-blend-difference text-white">
            or
          </h2>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={logoIcon}
              alt="EdTech Logo Hero"
              width={100}
              height={100}
            />
            <h2 className="text-3xl font-semibold mix-blend-difference text-white">
              Scroll to explore
            </h2>
          </div>
        </div>
        <div
          ref={heroWrapperRef}
          className="brightness-70 rounded-custom hero-wrapper h-[120vh] flex items-start justify-start w-full"
        >
          <BackgroundVideo
            className="rounded-custom h-[120vh] w-full object-cover object-center min-h-full video-styles"
            src={heroReel}
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center xl:py-32 md:px-10 px-5 py-16">
          <h1 className="xl:text-9xl lg:text-7xl md:text-5xl sm:text-4xl text-2xl xl:pb-10 lg:pb-8 sm:pb-4 font-light mb-4 text-white ">
            Featured Videos
          </h1>
          <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full">
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
                      className="rounded-lg transform group-hover:scale-105 transition-all duration-300 ease-out group-hover:rotate-1"
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
                  <p className="md:text-lg text-md mb-2 text-white font-light">
                    {truncateText(video.title, 50)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-full flex items-center md:justify-center pt-10 justify-start">
            <CTA to="/explore">View more</CTA>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center xl:py-32 md:px-10 px-5 sm:py-16 py-10">
          <h1 className="xl:text-9xl lg:text-7xl md:text-5xl sm:text-4xl text-2xl font-light mb-4 text-white xl:pb-10 lg:pb-8 sm:pb-4 max-w-[57rem]">
            Reaching New Summits
          </h1>
          <div className="flex lg:flex-row flex-col gap-[2rem] w-full">
            <p className="md:text-md text-sm mb-2 text-white font-extralight max-w-xl leading-relaxed">
              LearnMore’s series on mountain exploration for outdoor enthusiasts
              has garnered international acclaim for its groundbreaking approach
              to capturing the essence of rock climbing and mountaineering. Our
              series have been recognized for their exceptional cinematography,
              immersive audio, and stunning special effects. At the prestigious
              Outdoor Adventure Awards, our series have been celebrated for Best
              Adventure Documentary and Best Technical Achievement.
            </p>
            <div className="overflow-hidden">
              <div
                ref={mountaineeringRef}
                className="md:h-[470px]"
              >
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
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center xl:py-32 md:px-10 px-5 sm:py-16 py-10">
          <h1 className="xl:text-9xl lg:text-7xl md:text-5xl sm:text-4xl text-2xl font-light mb-4 text-white xl:pb-10 lg:pb-8 sm:pb-4 max-w-[57rem] text-end self-end">
            A Journey Like No Other
          </h1>
          <div className="flex lg:flex-row flex-col-reverse gap-[2rem] w-full">
            <div className="overflow-hidden">
              <div
                ref={snowyRef}
                className="md:h-[470px]"
              >
                <Image
                  width={1000}
                  height={600}
                  alt="Snowy Mountain"
                  src={snowyMountain}
                />
              </div>
            </div>
            <p className="md:text-md text-sm mb-2 text-white font-extralight max-w-xl leading-relaxed">
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
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center xl:py-32 md:px-10 px-5 sm:py-16 py-10">
          <h1 className="xl:text-9xl lg:text-7xl md:text-5xl sm:text-4xl text-2xl font-light mb-4 text-white xl:pb-10 lg:pb-8 sm:pb-4 max-w-[57rem]">
            Explore. Learn. Achieve.
          </h1>
          <div className="flex lg:flex-row flex-col gap-[2rem] w-full">
            <p className="md:text-md text-sm mb-2 text-white font-extralight max-w-xl leading-relaxed">
              At LearnMore, we believe in the power of education and adventure.
              Our comprehensive library of educational videos covers everything
              from beginner rock climbing techniques to advanced mountaineering
              expeditions. Join us on a journey to discover the wonders of the
              vertical world and equip yourself with the knowledge and skills to
              reach new heights.
            </p>
            <div className="overflow-hidden">
              <div
                ref={climbingRef}
                className="md:h-[470px]"
              >
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
