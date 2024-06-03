"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import axios from "axios";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "react-query";
import Image from "next/image";
import backgroundExplore from "../../../public/images/explore1.jpg";
import foregroundExplore from "../../../public/images/treeLayer1.png";
import logoIcon from "../../../public/images/LOGO_ICON.png";
import { RootState, AppDispatch } from "../../store/store";
import { setVideos } from "../../features/videoSlice";
import Link from "next/link";
import { truncateText } from "@/lib/charHelpers";
import { getThumbnailUrl } from "../../lib/getThumbNailUrl";
import { useDispatch, useSelector } from "react-redux";
import CTA from "../../components/button";
import SearchBar from "../../components/search";

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const userId = "daniel_bogart";
  const dispatch = useDispatch<AppDispatch>();
  const [visibleVideos, setVisibleVideos] = useState<number>(9);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

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

      return sortedVideos;
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
      setFilteredVideos(videos);
    }
  }, [videos, dispatch]);

  useEffect(() => {
    if (heroWrapperRef.current) {
      gsap.fromTo(
        heroWrapperRef.current,
        { y: -800 },
        {
          y: 0,
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom+=150% top",
          },
        }
      );
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  const handleViewMore = () => {
    setVisibleVideos((prevCount) => prevCount + 9);
  };

  const handleSearch = (query: string) => {
    if (videos) {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  };

  if (isLoading)
    return (
      <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );

  return (
    <div className="">
      <section className="relative flex w-full h-[120vh] overflow-hidden rounded-custom items-start justify-start bg-black">
        <div className="absolute flex flex-col inset-0 flex items-center justify-center z-30 gap-10 px-5">
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
          className="brightness-70 hero-wrapper h-[130vh] flex items-start justify-start w-full"
        >
          <Image
            src={backgroundExplore}
            layout="fill"
            objectFit="cover"
            alt="background"
          />
        </div>
        <div className="absolute bottom-0 left-0 brightness-70 flex items-start justify-start w-full">
          <Image src={foregroundExplore} alt="foreground" />
        </div>
        <div className="w-full bottom-0 h-[70vh] z-2 left-0 absolute bg-custom-fade"></div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col w-full max-w-screen-2xl items-start justify-center xl:py-32 md:px-10 px-5 py-16">
          <h1 className="xl:text-9xl lg:text-7xl md:text-5xl sm:text-4xl text-2xl xl:pb-10 lg:pb-8 sm:pb-4 font-light mb-4 text-white ">
            Start exploring
          </h1>
          {/* Integrate SearchBar Component */}
          <SearchBar onSearch={handleSearch} />
          <ul className="min-h-[1060px] grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full">
            {filteredVideos.slice(0, visibleVideos).map((video: Video) => (
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
          {visibleVideos < filteredVideos.length && (
            <div className="w-full flex items-center md:justify-center pt-10 justify-start">
              <CTA onClick={handleViewMore}>View more</CTA>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
