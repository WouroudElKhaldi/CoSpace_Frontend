"use client";
import styles from "./HomePage.module.css";
import Image from "next/image";
import useSpaceStore from "@/zustand/spaceStore";
import { useEffect, useState } from "react";
import { getAllSpaces, getTopRatedSpaces } from "@/fetchData/spaces";
import SpaceCard from "../spaceCard/spaceCard";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const { spacesData, top5Spaces, setTop5Spaces, setSpacesData } =
    useSpaceStore();

  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await getAllSpaces();
      setSpacesData(res);
    };

    const fetchTopSpaces = async () => {
      const res = await getTopRatedSpaces();
      setTop5Spaces(res);
    };

    fetchSpaces();
    fetchTopSpaces();
    setLoading(false);
  }, [top5Spaces, spacesData, setSpacesData, setTop5Spaces]);

  return (
    <div className={styles.container}>
      <span className={styles.title_holder}>
        <h2 className={styles.h2}>Latest Spaces</h2>
        <Image
          src="/title.svg"
          width={100}
          height={100}
          alt="image"
          className={styles.svg1}
        />
      </span>
      <div className={styles.space_holder}>
        {loading ? (
          <p>Loding</p>
        ) : (
          <>
            {spacesData &&
              spacesData.map((space, index) => {
                return <SpaceCard data={space} key={index} />;
              })}
          </>
        )}
      </div>
    </div>
  );
}
