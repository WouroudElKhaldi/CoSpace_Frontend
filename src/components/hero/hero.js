"use client";

import { useEffect, useRef } from "react";
import styles from "./hero.module.css";
import Typed from "typed.js";

export default function HeroComp() {
  let mystrings;
  mystrings = [""];
  useEffect(() => {
    mystrings.push("  Cowork", "  Create", "  Collaborate");

    const typed = new Typed(slogan.current, {
      strings: mystrings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [mystrings]);
  const slogan = useRef();
  return (
    <section className={styles.container}>
      <div className={styles.img}></div> {/* Background container */}
      <div className={styles.content}>
        <div className={styles.slogan__container}>
          <p className={styles.slogan}>
            Coworking spaces designed for you to{" "}
            <span ref={slogan} className={styles.typed}></span>
          </p>
          <button className={styles.btn}>List You Space</button>
        </div>
      </div>
    </section>
  );
}
