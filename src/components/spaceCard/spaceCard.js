"use client";

import Image from "next/image";
import styles from "./spaceCard.module.css";
import Carousel from "../carousel/carousel";
import { getSpaceImage } from "@/fetchData/spaces";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

export default function SpaceCard({ data }) {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  const pathname = usePathname();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const varRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.5 } // Change threshold as needed
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (varRef) {
        observer.unobserve(varRef);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
      }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "20px" }}
      className={`${styles.card} ${pathname === "/" ? styles.home : ""}`}
    >
      <Link href={`spaces/${data._id}`}>
        <div className={styles.img}>
          <Carousel images={images && images} />
        </div>
        <div className={styles.info}>
          <p className={styles.top}>
            <p className={styles.title}>{data.name}</p>
            <span className={styles.price}>⭐ 4.93</span>
          </p>
          <p className={styles.owner}>
            <b>Owner: </b>
            {data.userId.fullName}
          </p>
          <span className={styles.btm}>
            <p className={styles.type}>{data.categoryId.name} Space</p>
            <p className={styles.location}>{data.cityId.city}</p>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
