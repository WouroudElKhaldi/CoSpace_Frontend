"use client";

import Image from "next/image";
import styles from "./spaceCard.module.css";
import Carousel from "../carousel/carousel";
import { getSpaceImage } from "@/fetchData/spaces";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SpaceCard({ data }) {
  const pathname = usePathname();
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSpaceImage();
      setImages(res);
    };

    fetchData();
  }, []);
  return (
    <div className={`${styles.card} ${pathname === "/" ? styles.home : ""}`}>
      <Link href={`spaces/${data._id}`}>
        <div className={styles.img}>
          <Carousel images={images && images} />
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            {data.name}
            <span> 4.93</span>
          </p>
          <p className={styles.type}>Co working space</p>
          <p className={styles.title}>card</p>
        </div>
      </Link>
    </div>
  );
}
