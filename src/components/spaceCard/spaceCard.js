import Image from "next/image";
import styles from "./spaceCard.module.css";
import Carousel from "../carousel/carousel";

export default function SpaceCard() {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <Carousel />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>
          Seaq
          <span> 4.93</span>
        </p>
        <p className={styles.type}>Co working space</p>
        <p className={styles.title}>card</p>
      </div>
    </div>
  );
}
